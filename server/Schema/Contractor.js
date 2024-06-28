const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

const contractorSchema = new mongoose.Schema({
  contractorId: {
    type: Number,
    unique: true,
  },
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
  fireAuditdate: {
    type: Date,
  },
  licence_fees_paid_upto: {
    type: Date,
  },
  licensee: {
    type: String,
  },
  Licensee_Contact_details: {
    type: Number,
  },
  total_vendors_permitted: {
    type: Number,
  },
  vendors_permitted_at_platform: {
    type: Number,
  },
  vendors_permitted_at_stole: {
    type: Number,
  },
  // IsStationService: {
  //   type: Boolean,
  // },
  authorityDocument: {
    type: String,
  },
  // isStationService: {
  //   type: String,
  // },
  stationName: [],
  pfPermitted: [],
  // nameofstation: [],
  sectionname: [],
  selectedTrains: [],
  vendors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
  ],
});

contractorSchema.pre("save", async function (next) {
  const doc = this;
  if (doc.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "contractorId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      doc.contractorId = counter.seq;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model("Contractor", contractorSchema);
