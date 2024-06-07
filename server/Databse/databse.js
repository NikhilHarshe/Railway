// database.js
const mongoose = require("mongoose");
require('dotenv').config();

const MONGODB_URL = process.env.MONGODB_URL 

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); 
  }
};

module.exports = connectDB;
