const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, gender, dateOfBirth, country, state, city, fulladdress, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      gender,
      dateOfBirth,
      country,
      state,
      city,
      fulladdress,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User created",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({ email });

    if(!user){
      return res.status(400).json({
        success: false,
        message: "invalid User"
      });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if(!isMatchPassword){
      return res.status(400).json({
        success: false,
        message: "password incorrect"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      message: "login success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
     res.status(500).json({
       message: error.message
     });
  }
});
module.exports = router;