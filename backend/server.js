const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const authMiddleware = require("./middleware/authMiddleware");
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
const avatarRoutes = require("./routes/avatarRoutes");
const auctionRoutes = require("./routes/auctionRoutes");


app.use(cors());
app.use(express.json());

//get profile through middleware

app.get("/api/profile", authMiddleware, async (req, res) => {
  try{
     const userdetails = await User.findById(req.user.id).select("-password");

     res.json({
        message: "Protected Route",
        user: userdetails
     });
  }
  catch(error){
    res.status(401).json({
      message: error.message
    });
  }
});

// uploads path
const path = require('path');
app.use("/uploads",  express.static(path.join(__dirname, "uploads")));

app.use("/api/users", avatarRoutes);
// Authentications
app.use("/api/auth", authRoutes);

app.use("/api/auctions", auctionRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.error("MongoDB Error:", err);
    console.error("Message:", err.message);
    console.error("Code:", err.code);
  });