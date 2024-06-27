const express = require("express");
const router = express.Router();
const { CreateMasterData, fetchAgency } = require("../Controller/MasterData");

router.get("/fetchmasteragencydata", fetchAgency);
router.post("/addMasterData", CreateMasterData);
// router.put("/updateagency", updateAgency);
// router.delete("/delete/:id", deleteAgency);

module.exports = router;
