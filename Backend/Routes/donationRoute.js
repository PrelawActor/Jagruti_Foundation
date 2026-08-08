const express = require("express");

const router = express.Router();



const {

    createOrder,

    verifyPayment

} = require("../Controller/donationController");

router.post("/create-order", createOrder);

router.post("/verify", verifyPayment);

module.exports = router;