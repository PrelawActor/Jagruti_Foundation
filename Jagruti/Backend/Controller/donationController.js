const db = require("../Config/db");
const razorpay = require("../Config/razorpay");
const crypto = require("crypto");
exports.createOrder = async (req, res) => {

    try {

        const { name, email, phone, amount, message } = req.body;

        if (!amount || Number(amount) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid donation amount"
            });
        }

        const options = {

            amount: Number(amount) * 100, // Convert ₹ to paise

            currency: "INR",

            receipt: `DONATION_${Date.now()}`,

            notes: {
                name,
                email,
                phone,
                message
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
        name,
        email,
        phone,
        amount,
        message
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

    try {

const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
} = req.body;

        // Create expected signature

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        // Compare signatures

        if (expectedSignature !== razorpay_signature) {

            return res.status(400).json({

                success: false,

                message: "Payment verification failed"

            });

        }

        // Payment is verified
        const [pendingRows] = await db.execute(
    `
    SELECT *
    FROM pending_donations
    WHERE razorpay_order_id = ?
    `,
    [razorpay_order_id]
);

if (pendingRows.length === 0) {

    return res.status(404).json({
        success: false,
        message: "Pending donation not found"
    });

}

const pendingDonation = pendingRows[0];
await db.execute(
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
await db.execute(
    `
    DELETE FROM pending_donations
    WHERE razorpay_order_id = ?
    `,
    [razorpay_order_id]
);

console.log("Donation moved successfully to donations table.");

        return res.status(200).json({

            success: true,

            message: "Payment Verified Successfully"

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Verification Error"

        });

    }

};