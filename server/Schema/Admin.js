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
  Email : {
    type: String,
  },
  Password :{
    type: String,
  },

});

module.exports = mongoose.model("Admin", model);
