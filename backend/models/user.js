const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
    unique: true,
    index: true,
    lowercase: true
  },

  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },

  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true
  }
});
