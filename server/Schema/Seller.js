const mongoose = require("mongoose");

const model = new mongoose.Schema({
  Designation_Name: {
    type:String,
  }
});

module.exports = mongoose.model("Seller", model);
