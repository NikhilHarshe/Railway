const mongoose = require("mongoose");

const MasterDataSchema = mongoose.Schema({
    agency: [{
        type: String,
      }],
    contractType : [{
        type: String,
    }],
    sectionName: [{
        type: String,
    }],
    selectedTrains : [{
        type: String,
    }],
    nameOfStation : [{
        type: String,
    }],
    admin: {
        type: mongoose.Schema.ObjectId,
        ref: "Admin"
    }
})

module.exports = mongoose.model("MasterData", MasterDataSchema);