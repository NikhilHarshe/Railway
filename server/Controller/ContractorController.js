const Contractor = require("../Schema/Contractor");
const bcrypt = require("bcryptjs");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

const registerContractor = async (req, res) => {
  console.log("hi");
  const {
    agency,
    typeofcontract,
    ContractperiodFrom,
    ContractperiodTo,
    Licenseename,
    Licenseecontactdetails,
    LicenseFeesPaidUptoDate,
    sectionname,
    nameofstation,
  } = req.body;

  const totalVendorsPermitted =
    req.body.totalVendorsPermitted || req.body.TotalVendorsPermitted;
  const vendorsPermitedatPlatform =
    req.body.vendorsPermitedatPlatform || req.body.vendorPermitedatPlatform;
  const vendorsPermitedatStole =
    req.body.vendorsPermitedatStole || req.body.vendorPermitedatStole;
  const selectedTrains = req.body["selectedStations[]"];

  try {
    console.log("Received request body:", req.body);
    console.log("selectedTrains:", selectedTrains);

    let missingFields = [];

    if (
      typeofcontract === "On board Catering" ||
      typeofcontract === "On board Non–Catering"
    ) {
      if (!agency) missingFields.push("agency");
      if (!typeofcontract) missingFields.push("typeofcontract");
      if (!ContractperiodFrom) missingFields.push("ContractperiodFrom");
      if (!ContractperiodTo) missingFields.push("ContractperiodTo");
      if (!Licenseename) missingFields.push("Licenseename");
      if (!Licenseecontactdetails) missingFields.push("Licenseecontactdetails");
      if (!totalVendorsPermitted) missingFields.push("totalVendorsPermitted");
      if (!LicenseFeesPaidUptoDate)
        missingFields.push("LicenseFeesPaidUptoDate");
      if (!selectedTrains) missingFields.push("selectedTrains");
      if (!sectionname) missingFields.push("sectionname");

      if (missingFields.length > 0) {
        console.log(
          "Missing fields for Dynamic contract:",
          missingFields.join(", ")
        );
        return res.status(400).json({
          success: false,
          message: `All Fields are Mandatory for Dynamic: ${missingFields.join(
            ", "
          )}`,
        });
      }
    } else {
      if (!agency) missingFields.push("agency");
      if (!typeofcontract) missingFields.push("typeofcontract");
      if (!ContractperiodFrom) missingFields.push("ContractperiodFrom");
      if (!ContractperiodTo) missingFields.push("ContractperiodTo");
      if (!Licenseename) missingFields.push("Licenseename");
      if (!Licenseecontactdetails) missingFields.push("Licenseecontactdetails");
      if (!totalVendorsPermitted) missingFields.push("totalVendorsPermitted");
      if (!vendorsPermitedatPlatform)
        missingFields.push("vendorsPermitedatPlatform");
      if (!vendorsPermitedatStole) missingFields.push("vendorsPermitedatStole");
      if (!LicenseFeesPaidUptoDate)
        missingFields.push("LicenseFeesPaidUptoDate");
      if (!selectedTrains) missingFields.push("selectedTrains");

      if (missingFields.length > 0) {
        console.log(
          "Missing fields for Static contract:",
          missingFields.join(", ")
        );
        return res.status(400).json({
          success: false,
          message: `All Fields are Mandatory for Static: ${missingFields.join(
            ", "
          )}`,
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
      total_vendors_permitted: totalVendorsPermitted,
      vendors_permitted_at_platform: vendorsPermitedatPlatform,
      vendors_permitted_at_stole: vendorsPermitedatStole,
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
    LicenseFeesPaidUptoDate,
    Licenseename,
    Licenseecontactdetails,
    totalVendorsPermitted,
    vendorsPermitedatPlatform,
    vendorsPermitedatStole,
    contractorId,
  } = req.body;
  console.log("Frontend Data", req.body);

  try {
    let user = await Contractor.findOne({ contractorId });
    console.log("Backend Data", user);

    const selectedTrains = req.body["selectedTrains[]"];
    console.log("selectedTrains[] ", selectedTrains);

    // Ensure the inner try block has a corresponding catch block
    try {
      // Find the contractor by ID
      console.log("req.body : ", req.body);
      const contractor = await Contractor.findOne({ contractorId });

      console.log("Contractor data : ", contractor);

      if (!contractor) {
        return res.status(404).json({ message: "Contractor not found" });
      }

      let imgUrl = "";
      if (req.files) {
        const file = req.files.AutherityDoc;
        const fileName = process.env.FOLDER_NAME;
        const response = await uploadImageToCloudinary(file, fileName);
        console.log("response ", response);
        imgUrl = response?.secure_url;
        await user.save();
        res.status(200).json({ message: "User updated successfully" });
        contractor.AutherityDoc = imgUrl;
      }

      // Update contractor fields
      contractor.agency = agency;
      contractor.category = typeofcontract;
      contractor.fromDate = new Date(ContractperiodFrom);
      contractor.toDate = new Date(ContractperiodTo);
      contractor.licence_fees_paid_upto = new Date(LicenseFeesPaidUptoDate);
      contractor.licensee = Licenseename;
      contractor.Licensee_Contact_details = Licenseecontactdetails;
      contractor.total_vendors_permitted= totalVendorsPermitted;
      contractor.vendors_permitted_at_platform = vendorsPermitedatPlatform;
      contractor.vendors_permitted_at_stole = vendorsPermitedatStole;
      contractor.selectedTrains = selectedTrains;

      // Save the updated contractor
      const updatedUser = await contractor.save();
      console.log("updated Contractor : ", updatedUser);

      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      console.error(`Error updating user: ${error}`);
      res.status(500).json({ message: "Internal server error", error });
    }
  } catch (error) {
    console.error(`Error finding user: ${error}`);
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
    console.log("hi");
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
