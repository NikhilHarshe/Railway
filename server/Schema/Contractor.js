const mongoose = require("mongoose");

const contractorSchema = new mongoose.Schema({
  agency: {
    type: String,
  },
  category: {
    type: String,
  },
  fromDate: {
    type: Date,
  },
  toDate: {
    type: Date,
  },
  licence_fees_paid_upto: {
    type: Date,
  },
  licensee: {
    type: String,
  },
  LicenseeAadharNo: {
    type: String,
  },
  Licensee_Contact_details: {
    type: Number,
  },
  vendors_permitted: {
    type: Number,
  },
  IsStationService:{
    type : Boolean
  },
  authorityDocument:{
    type: String,
  },
  isStationService:{
    type: String,
  },
  stationName: [
    
  ],
  pfPermitted: [

  ],
  vendors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
  ]
});

module.exports = mongoose.model("Contractor", contractorSchema);
