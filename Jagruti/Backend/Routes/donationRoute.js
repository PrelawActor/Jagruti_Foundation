const express = require("express");

const router = express.Router();

const donationController = require("../Controller/donationController");

router.post("/create-order", donationController.createOrder);

module.exports = router;