const mongoose = require("mongoose");

const model = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Designation: {
    type: String,
    required: true,
  },
  Mobile: {
    type: Number,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    enum: ["Admin", "SuperAdmin"],
    required: true,
  }

});

module.exports = mongoose.model("Admin", model);
