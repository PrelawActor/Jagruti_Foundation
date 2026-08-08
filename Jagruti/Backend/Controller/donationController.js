const validator = require("validator");
const mongoose = require("mongoose");
const PendingDonation = require("../Models/PendingDonation");
const Donation = require("../Models/Donation");
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
await PendingDonation.create({
    razorpay_order_id: order.id,
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    amount: donationAmount,
    message: cleanMessage
});

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
    
    let session;

try {

    session = await mongoose.startSession();

    session.startTransaction();

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
   await session.abortTransaction();
session.endSession();
session = null;

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

            await session.abortTransaction();
session.endSession();
session = null;
    return res.status(400).json({
        success: false,
        message: "Payment verification failed"
    });

        }

        // Payment is verified
       // Payment is verified

// Check if payment has already been processed
const existingDonation = await Donation.findOne(
    {
        $or: [
            { razorpay_payment_id },
            { razorpay_order_id }
        ]
    }
).session(session);

if (existingDonation) {

    await session.abortTransaction();
    session.endSession();
    session = null;

    return res.status(409).json({
        success: false,
        message: "Payment has already been processed."
    });

}

// Get the pending donation
const pendingDonation = await PendingDonation.findOne({
    razorpay_order_id
}).session(session);

if (!pendingDonation) {

    await session.abortTransaction();
    session.endSession();
    session = null;

    return res.status(404).json({
        success: false,
        message: "Pending donation not found"
    });

}
await Donation.create(
    [
        {
            razorpay_order_id,
            razorpay_payment_id,
            name: pendingDonation.name,
            email: pendingDonation.email,
            phone: pendingDonation.phone,
            amount: pendingDonation.amount,
            message: pendingDonation.message
        }
    ],
    { session }
);
await PendingDonation.deleteOne(
    { razorpay_order_id },
    { session }
);

console.log("Donation moved successfully to donations table.");
await session.commitTransaction();
session.endSession();
session = null;
        return res.status(200).json({

            success: true,

            message: "Payment Verified Successfully"

        });

    } catch (error) {

        if (session) {

    if (session.inTransaction()) {
        await session.abortTransaction();
    }

    session.endSession();

}

   console.error("Payment verification error:", error);

    return res.status(500).json({
        success: false,
        message: "Verification Error"
    });

    }

};