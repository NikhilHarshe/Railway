const express = require("express");
const router = express.Router();
const {
  InvigilatorLogin,
  registerVendor,
  updateInvigilator,
  deleteInvigilator,
  fetchInvigilatorData,
  fetchInvigilatorDataByQRCode
} = require("../Controller/VendorController");

router.get("/fetchInvigilatorData", fetchInvigilatorData);
router.post("/fetchVendorDataByQR", fetchInvigilatorDataByQRCode);
router.post("/invigilatorlogin", InvigilatorLogin);
router.post("/registerVendor", registerVendor);
router.put("/update/", updateInvigilator); 
router.delete("/delete/:email", deleteInvigilator);

module.exports = router;


