const express = require("express");
const Auction = require("../models/Auction");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
    try {
        const {title, description, startingPrice, endTime} = req.body;
        
        const auction = await Auction.create({
            title,
            description,
            startingPrice,
            currentPrice: startingPrice,
            endTime,
            seller: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Auction item is created",
            auction
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;