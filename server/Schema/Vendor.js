const mongoose = require("mongoose");
const Contractor = require("./Contractor");

const model = new mongoose.Schema({
  fname: {
    type: String,
  },
  dob: {
    type: Date,
  },
  mobile: {
    type: Number,
  },
  aadhar: {
    type: Number,
  },
  aadharCard: {
    type: String,
  },
  policeVarificationDate: {
    type: Date,
  },
  policeVarificationDocument: {
    type: String,
  },
  medicalValidityDate: {
    type: Date,
  },
  madicalValidityDocument: {
    type: String,
  },
  validityAuthority: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  qrcode: {
    type: String,
  },
  Contractor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contractor",
    },
  
});

module.exports = mongoose.model("Vendor", model);
