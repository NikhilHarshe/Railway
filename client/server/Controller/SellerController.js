const Seller = require("../Schema/Seller");
const bcrypt = require("bcryptjs");

const registerSeller = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    designation,
    contractor,
    qrcode,
    profilePic,
  } = req.body;
  console.log("rrrrrrr", qrcode);
  try {
    const existingUser = await Seller.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Seller({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      designation,
      contractor,
      qrcode,
      profilePic,
    });
    console.log("hi");
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
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
clg
  try {
    // Find the contractor with the given QR code
    const contractor = await Seller.findOne({ qrcode });

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


const fetchSellerDataByQRCode = async (req, res) => {
  const { qrcode } = req.body;
  console.log("QR Code:", qrcode);
  console.log("QR Code2:", req.body);

  try {
    const user = await Seller.findOne({ qrcode });

    if (user) {
      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        designation: user.designation,
        contractor: user.contractor,
        profilePic: user.profilePic,
      };

      res
        .status(200)
        .json({ user: userData, message: "User data fetched successfully" });
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
  registerSeller,
  fetchSellerDataByQRCode,
  saveQRCode,
};
