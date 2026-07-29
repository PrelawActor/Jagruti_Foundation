const razorpay = require("../config/razorpay");
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

            razorpay_signature,

            name,

            email,

            phone,

            amount,

            message

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

        console.log("Payment Verified Successfully");

        console.log({

            name,

            email,

            phone,

            amount,

            message,

            razorpay_payment_id

        });

        // TODO:
        // Save donation into MySQL here

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