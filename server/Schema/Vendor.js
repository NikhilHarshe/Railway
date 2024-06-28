const mongoose = require("mongoose");
const Contractor = require("./Contractor");

const model = new mongoose.Schema({
  fname: {
    type: String,
    trim: true,
  },
  mname: {
    type: String,
    trim: true,
  },
  lname: {
    type: String,
    trim: true,
  },
  dob: {
    type: Date,
  },
  mobile: {
    type: Number,
    trim: true,
  },
  aadhar: {
    type: Number,
    trim: true,
  },
  aadharCardImg: {
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
    trim: true,
  },
  LicenseeId: {
    type: String,
    trim: true,
  },
  Contractor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contractor",
    },
  
});

module.exports = mongoose.model("Vendor", model);
