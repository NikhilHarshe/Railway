const express = require("express");
const router = express.Router();
const {
  registerContractor,
  updateUser,
  deleteUser,
  saveQRCode,
  fetchContractorDataByQRCode,
} = require("../Controller/ContractorController");

router.post("/fetchcontractordata", fetchContractorDataByQRCode);
router.post("/registercontractor", registerContractor);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);
router.post("/saveqrcode", saveQRCode);

module.exports = router;
