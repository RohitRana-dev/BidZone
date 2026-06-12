const mongoose = require("mongoose");
const User = require("./User");

const auctionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startingPrice: {
        type: Number,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Auction", auctionSchema);