const mongoose = require("mongoose");

const model = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  MiddleName: {
    type: String,
    required: true,
  },
  LastName: {
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
  },
  Image: {
    type: String
},

});

module.exports = mongoose.model("Admin", model);
