const express = require("express");
const router = express.Router();
const {
 
  registerSeller,
  updateUser,
  deleteUser,
  saveQRCode,
  fetchSellerDataByQRCode,
} = require("../Controller/SellerController");

router.post("/fetchsellerdata", fetchSellerDataByQRCode);
router.post("/registerseller", registerSeller);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);
router.post("/saveqrcode", saveQRCode);

module.exports = router;
