const mongoose = require("mongoose");

const model = new mongoose.Schema({
  Name: {
    type: String,
  },
  Designation: {
    type: String,
  },
  Mobile: {
    type:Number,
  },
});

module.exports = mongoose.model("Admin", model);
