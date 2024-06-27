const Vendor = require("../Schema/Vendor");
const Contractor = require("../Schema/Contractor")
const bcrypt = require("bcryptjs");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

const VendorLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  try {
    const user = await Vendor.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("hi");
    if (isMatch) {

      res
        .status(200)
        .json({ user: user, message: "Authentication successful" });

    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    console.log(error)
  }
};

const fetchVendorData = async (req, res) => {
  try {
    const Vendors = await Vendor.find().populate("Contractor").exec();
    res.status(200).json({success: true, data:Vendors, message: "Data Fetch successfuly"});
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const fetchVendorDataByQRCode = async (req, res) => {
  const { qrcode } = req.body;
  console.log("QR Code:", req.body);

  try {
    const user = await Vendor.findOne({ qrcode });

    if (user) {
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

const registerVendor = async (req, res) => {
  const {
    fname,
    mname,
    lname,
    dob,
    mobile,
    aadhar,
    policeVarificationDate,
    medicalValidityDate,
    validityAuthority,
    LicenseeId,
    qrcode,
  } = req.body;
  console.log('Body', req.body);

  try {
    // Check if the vendor already exists
    const existingUser = await Vendor.findOne({ aadhar });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Find the contractor associated with the provided LicenseeId
    const contractor = await Contractor.findOne({ contractorId: LicenseeId });
    console.log('Contractor', contractor);
    if (!contractor) {
      return res.status(403).json({ success: false, message: "Contractor not Registered" });
    }

    let imgUrls = {};

    if (req.files) {
      console.log("img ", req.files);

      for (const [key, file] of Object.entries(req.files)) {
        try {
          const fileName = process.env.FOLDER_NAME;
          const response = await uploadImageToCloudinary(file, fileName);
          console.log(`response for ${key}: `, response);
          imgUrls[key] = response?.secure_url; // Store the secure URL for each file
        } catch (error) {
          console.error(`Error uploading ${key}: `, error);
          return res.status(500).json({ success: false, message: `Error uploading ${key}` });
        }
      }
    }

    // Create a new vendor
    const newVendor = new Vendor({
      fname,
      mname,
      lname,
      dob,
      mobile,
      profilePic: imgUrls.profilePic,
      aadhar,
      aadharCardImg: imgUrls.aadharCardImg,
      policeVarificationDate,
      policeVarificationDocument: imgUrls.policeVarificationDocument,
      medicalValidityDate,
      madicalValidityDocument: imgUrls.madicalValidityDocument,
      validityAuthority,
      Contractor: contractor._id,
      qrcode
    });

    // Save the new vendor
    const savedVendor = await newVendor.save();

    // Add the new vendor's ID to the contractor's vendors array
    contractor.vendors.push(savedVendor._id);
    await contractor.save();
    const vendors = await Vendor.find();

    res.status(201).json({ data: savedVendor, vendors, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    console.log(error);
  }
};

const updateVendor = async (req, res) => {
  const { _id, ...newData } = req.body;
  console.log("req.body:", req.body);

  try {
      const oldVendor = await Vendor.findById(_id);
      if (!oldVendor) {
          return res.status(404).json({ message: "Vendor not found" });
      }
      console.log("OldVendor:", oldVendor);

      let imgUrls = {};

      if (req.files) {
          console.log("Files to upload:", req.files);

          for (const [key, file] of Object.entries(req.files)) {
              try {
                  const fileName = process.env.FOLDER_NAME; // Replace with your folder name
                  const response = await uploadImageToCloudinary(file, fileName);
                  console.log(`Response for ${key}: `, response);
                  imgUrls[key] = response?.secure_url; // Store the secure URL for each file
              } catch (error) {
                  console.error(`Error uploading ${key}: `, error);
                  return res.status(500).json({ success: false, message: `Error uploading ${key}` });
              }
          }
      }

      // Update fields in newData with imgUrls if they exist
      for (const key in imgUrls) {
          if (imgUrls.hasOwnProperty(key)) {
              newData[key] = imgUrls[key];
          }
      }

      // Update the vendor with newData
      await Vendor.updateOne({ _id }, newData);

      res.status(200).json({ message: "Vendor updated successfully" });
  } catch (error) {
      console.error("Error updating vendor:", error);
      res.status(500).json({ message: "Internal server error", error });
  }
};

const deleteVendor = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    // Correct usage of findByIdAndDelete
    const user = await Vendor.findByIdAndDelete(id);
    console.log("deleted vendor", user);

    const vendors = await Vendor.find();
    console.log("Vendors ", vendors);

    if (!user) {
      return res.status(404).json({  
        message: "User not found" 
      });
    }

    res.status(200).json({ 
      vendors, 
      deletedVendor: user, 
      message: "User deleted successfully" 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Internal server error",
      error });
  }
};


const fileUpload = async (req, res) => {
  try{
    // console.log("Inside function ")
    const file = req.files.file;
    // console.log("img ", req.files.file);
    const fileName = process.env.FOLDER_NAME;
    const response = await uploadImageToCloudinary(file, fileName);
    // console.log("res : ", response);
    res.status(200).json({
      success: true,
      message: "Image uploded Successfully",
    })
  }
  catch(error) {
    console.error(error),
    res.status(400).json({
      success: false,
      message: "Internal Server error",
    })
  }
}


module.exports = {
  fetchVendorData,
  fetchVendorDataByQRCode,
  VendorLogin,
  registerVendor,
  updateVendor,
  deleteVendor,
  fileUpload,
};
