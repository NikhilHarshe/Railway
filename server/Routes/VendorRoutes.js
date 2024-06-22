const express = require("express");
const router = express.Router();
const {
  fetchVendorData,
  fetchVendorDataByQRCode,
  VendorLogin,
  registerVendor,
  updateVendor,
  deleteVendor,
  fileUpload,
} = require("../Controller/VendorController");

router.get("/fetchVenderData", fetchVendorData);
router.post("/fetchVendorDataByQR", fetchVendorDataByQRCode);
router.post("/Vendorlogin", VendorLogin);
router.post("/registerVendor", registerVendor);
router.post("/updateVendor", updateVendor); 
router.delete("/deleteVender/:id", deleteVendor);
router.post("/imgUploade", fileUpload);

module.exports = router;


