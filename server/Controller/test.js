
const Contractor = require("../Schema/Contractor");
const bcrypt = require("bcryptjs");

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
    Authority,
    IsStationService,
    StationNames,
    PFPermitted,
    LicenseeAadharNo,
  } = req.body;

  console.log("contractor back end ", req.body);

  try {
    if(!agency || !typeofcontract || !ContractperiodFrom || !ContractperiodTo || !Licenseename || !Licenseecontactdetails || !VendorsPermitted || !LicenseFeesPaidUptoDate || !Authority || !IsStationService || !StationNames || !PFPermitted || !LicenseeAadharNo){
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }

    const userExist = await Contractor.findOne({LicenseeAadharNo});
    // console.log("User Exist ",userExist);
    if(userExist){
      return res.status(402).json({
        ExistingContractor: userExist,
        success: false,
        message: "User alredy Exist",
      })
    }

    const newContractor = new Contractor({
      agency,
      category: typeofcontract, // Assuming category maps to typeofcontract
      fromDate: ContractperiodFrom,
      toDate: ContractperiodTo,
      licensee: Licenseename,
      licence_fees_paid_upto:LicenseFeesPaidUptoDate,
      Licensee_Contact_details: Licenseecontactdetails,
      vendors_permitted: VendorsPermitted,
      stationName: StationNames,
      pfPermitted: PFPermitted,
      licence_fees_paid_upto:LicenseFeesPaidUptoDate,
      isStationService : IsStationService,
      authorityDocument:Authority,
      LicenseeAadharNo
    });

    const data = await newContractor.save();

    res.status(200).json({success:true, data, message: "Contractor registered successfully" });
  } catch (error) {
    console.error("Error saving contractor:", error);
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
};



const updateUser = async (req, res) => {
  const { email, name, gender, mobile, password } = req.body;

  try {
    const user = await Invigilator.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (gender) user.gender = gender;
    if (mobile) user.mobile = mobile;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const deleteUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Invigilator.findOneAndDelete({ email });

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
  const { qrcode } = req.body;
  console.log("QR Code:", req.body);

  try {
    const user = await Contractor.findOne({ qrcode });

    if (user) {
      // const userData = {
      //   firstName: user.firstName,
      //   lastName: user.lastName,
      //   email: user.email,
      //   designation: user.designation,
      //   invigilator: user.invigilator,
      //   profilePic: user.profilePic,
      // };

      res
        .status(200)
        .json({ user, message: "User data fetched successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
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
