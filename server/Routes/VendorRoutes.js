const express = require("express");
const router = express.Router();
const {
  fetchVenderData,
  fetchVenderDataByQRCode,
  VenderLogin,
  registerVendor,
  updateVender,
  deleteVender,
} = require("../Controller/VendorController");

router.get("/fetchVenderData", fetchVenderData);
router.post("/fetchVendorDataByQR", fetchVenderDataByQRCode);
router.post("/Venderlogin", VenderLogin);
router.post("/registerVendor", registerVendor);
router.put("/updateVender/", updateVender); 
router.delete("/deleteVender/:email", deleteVender);

module.exports = router;


