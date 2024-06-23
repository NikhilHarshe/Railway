const Contractor = require("../Schema/Contractor");
const bcrypt = require("bcryptjs");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
// const { uploadImageToCloudinary } = require("../utils/imageUploader");

const registerContractor = async (req, res) => {
  const {
    agency,
    typeofcontract,
    ContractperiodFrom,
    ContractperiodTo,
    Licenseename,
    Licenseecontactdetails,
    VendorsPermitted,
    LicenseFeesPaidUptoDate,
    sectionname,
    nameofstation,
  } = req.body;

  const selectedTrains = req.body["selectedTrains[]"];
console.log("selectedTrains", req.body["selectedTrains[]"]);
  try {
    console.log("Received request body:", req.body);

    if (
      typeofcontract === "On board Catering" ||
      typeofcontract === "On board Non–Catering"
    ) {
      if (
        !agency ||
        !typeofcontract ||
        !ContractperiodFrom ||
        !ContractperiodTo ||
        !Licenseename ||
        !Licenseecontactdetails ||
        !VendorsPermitted ||
        !LicenseFeesPaidUptoDate ||
        !selectedTrains || 
        !sectionname
      ) {
        console.log("Missing fields for Dynamic contract");
        return res.status(400).json({
          success: false,
          message: "All Fields are Mandatory for Dynamic",
        });
      }
    } else {
      if (
        !agency ||
        !typeofcontract ||
        !ContractperiodFrom ||
        !ContractperiodTo ||
        !Licenseename ||
        !Licenseecontactdetails ||
        !VendorsPermitted ||
        !LicenseFeesPaidUptoDate ||
        !nameofstation
      ) {
        console.log("Missing fields for Static contract");
        return res.status(400).json({
          success: false,
          message: "All Fields are Mandatory for Static",
        });
      }
    }

    let imgUrl = "";
    if (req.files) {
      const file = req.files.AutherityDoc;
      const fileName = process.env.FOLDER_NAME;
      const response = await uploadImageToCloudinary(file, fileName);
      console.log("response ", response);
      imgUrl = response?.secure_url;
    }

    const newContractor = new Contractor({
      agency,
      category: typeofcontract,
      fromDate: ContractperiodFrom,
      toDate: ContractperiodTo,
      licensee: Licenseename,
      licence_fees_paid_upto: LicenseFeesPaidUptoDate,
      Licensee_Contact_details: Licenseecontactdetails,
      vendors_permitted: VendorsPermitted,
      stationName: nameofstation,
      authorityDocument: imgUrl,
      sectionname,
      selectedTrains, // Ensure selectedTrains is included
    });

    const data = await newContractor.save();
    res.status(200).json({
      success: true,
      data,
      message: "Contractor registered successfully",
    });
  } catch (error) {
    console.log("Error saving contractor:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};


const updateUser = async (req, res) => {
  const {
    agency,
    typeofcontract,
    ContractperiodFrom,
    ContractperiodTo,
    Licenseename,
    Licenseecontactdetails,
    VendorsPermitted,
    LicenseFeesPaidUptoDate,
    sectionname,
    contractorId,
    stationName,
    "selectedTrains[]": selectedTrains,
  } = req.body;

  try {
    let user = await Contractor.findOne({ contractorId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.agency = agency;
    user.typeofcontract = typeofcontract;
    user.ContractperiodFrom = ContractperiodFrom;
    user.ContractperiodTo = ContractperiodTo;
    user.Licenseename = Licenseename;
    user.Licenseecontactdetails = Licenseecontactdetails;
    user.VendorsPermitted = VendorsPermitted;
    user.LicenseFeesPaidUptoDate = LicenseFeesPaidUptoDate;
    user.sectionname = sectionname;
    user.stationName = stationName;
    user.selectedTrains = selectedTrains;

    console.log("Updated user data:", user);

    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(`Error updating user: ${error}`);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log("Deleting user with ID:", id);
  try {
    const user = await Contractor.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const saveQRCode = async (req, res) => {
  const { qrcode } = req.body;
  try {
    // Find the contractor with the given QR code
    const contractor = await Contractor.findOne({ qrcode });

    if (!contractor) {
      return res.status(404).json({ message: "Contractor not found" });
    }

    // Update the contractor document with the new QR code value
    contractor.qrcode = qrcode;

    await contractor.save();

    res.status(200).json({ message: "QR Code saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const fetchContractorDataByQRCode = async (req, res) => {

  try {
    const contractors = await Contractor.find({}).populate("vendors").exec();
    console.log('hi')
    if (contractors) {
      res.status(200).json(contractors);
    } else {
      res.status(404).json({ message: "No contractors found" });
    }
  } catch (error) {
    console.error("Error fetching contractor data:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  updateUser,
  deleteUser,
  registerContractor,
  fetchContractorDataByQRCode,
  saveQRCode,
};
