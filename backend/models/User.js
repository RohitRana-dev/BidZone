const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth is required"]
  },
  country: {
    type: String,
    default: ""
  },
  state: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  fulladdress: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
