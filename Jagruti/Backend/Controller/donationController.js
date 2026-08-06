const validator = require("validator");
const db = require("../Config/db");
const razorpay = require("../Config/razorpay");
const crypto = require("crypto");
exports.createOrder = async (req, res) => {

    try {

        const { name, email, phone, amount, message } = req.body;

const cleanName = (name || "").trim();
const cleanEmail = (email || "").trim().toLowerCase();
const cleanPhone = (phone || "").trim();
const cleanMessage = (message || "").trim();
        // Validate Full Name
if (cleanName.length < 3 || cleanName.length > 100) {
    return res.status(400).json({
        success: false,
        message: "Please enter a valid full name."
    });
}

// Validate Email
if (!validator.isEmail(cleanEmail)) {
    return res.status(400).json({
        success: false,
        message: "Please enter a valid email address."
    });
}

// Validate Phone Number (Indian mobile)
if (!validator.isMobilePhone(cleanPhone, "en-IN")) {
    return res.status(400).json({
        success: false,
        message: "Please enter a valid Indian mobile number."
    });
}

// Validate Amount
const donationAmount = Number(amount);

if (!Number.isFinite(donationAmount) || donationAmount < 1 || donationAmount > 1000000) {
    return res.status(400).json({
        success: false,
        message: "Donation amount must be between ₹1 and ₹10,00,000."
    });
}

// Validate Message
if (cleanMessage.length > 500)  {
    return res.status(400).json({
        success: false,
        message: "Message cannot exceed 500 characters."
    });
}

       

        const options = {

            amount: donationAmount * 100, // Convert ₹ to paise

            currency: "INR",

            receipt: `DONATION_${Date.now()}`,

            notes: {
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    message: cleanMessage
}

        };

        const order = await razorpay.orders.create(options);

// Save donor information into pending_donations
await db.execute(
    `
    INSERT INTO pending_donations
    (
        razorpay_order_id,
        name,
        email,
        phone,
        amount,
        message
    )
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
    order.id,
    cleanName,
    cleanEmail,
    cleanPhone,
    donationAmount,
    cleanMessage
]
);

return res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_KEY_ID,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency
});

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Unable to create Razorpay order"

        });

    }

};
exports.verifyPayment = async (req, res) => {
    
    let connection;

    try {

        connection = await db.getConnection();

        await connection.beginTransaction();

const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
} = req.body;

if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature
) {
    await connection.rollback();
    connection.release();
    connection = null;

    return res.status(400).json({
        success: false,
        message: "Missing payment verification details."
    });
}
        // Create expected signature

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        // Compare signatures

        if (expectedSignature !== razorpay_signature) {

            await connection.rollback();
    connection.release();
            connection = null;
    return res.status(400).json({
        success: false,
        message: "Payment verification failed"
    });

        }

        // Payment is verified
       // Payment is verified

// Check if payment has already been processed
const [existingDonation] = await connection.execute(
    `
    SELECT id
    FROM donations
    WHERE razorpay_payment_id = ?
       OR razorpay_order_id = ?
    `,
    [
        razorpay_payment_id,
        razorpay_order_id
    ]
);

if (existingDonation.length > 0) {

    await connection.rollback();
    connection.release();
    connection = null;

    return res.status(409).json({
        success: false,
        message: "Payment has already been processed."
    });

}

// Get the pending donation
const [pendingRows] = await connection.execute(
    `
    SELECT *
    FROM pending_donations
    WHERE razorpay_order_id = ?
    `,
    
    [razorpay_order_id]
);

if (pendingRows.length === 0) {

    await connection.rollback();
    connection.release();
        connection = null;
    return res.status(404).json({
        success: false,
        message: "Pending donation not found"
    });

}

const pendingDonation = pendingRows[0];
await connection.execute(
    `
    INSERT INTO donations
    (
        razorpay_order_id,
        razorpay_payment_id,
        name,
        email,
        phone,
        amount,
        message
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
        razorpay_order_id,
        razorpay_payment_id,
        pendingDonation.name,
        pendingDonation.email,
        pendingDonation.phone,
        pendingDonation.amount,
        pendingDonation.message
    ]
);
await connection.execute(
    `
    DELETE FROM pending_donations
    WHERE razorpay_order_id = ?
    `,
    [razorpay_order_id]
);

console.log("Donation moved successfully to donations table.");
await connection.commit();
connection.release();
connection = null;
        return res.status(200).json({

            success: true,

            message: "Payment Verified Successfully"

        });

    } catch (error) {

        if (connection) {
        await connection.rollback();
        connection.release();
    }

   console.error("Payment verification error:", error);

    return res.status(500).json({
        success: false,
        message: "Verification Error"
    });

    }

};