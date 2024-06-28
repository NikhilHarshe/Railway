const express = require("express");
const router = express.Router();
const { CreateMasterData, fetchAgency , GetMasterData } = require("../Controller/MasterData");


router.get("/fetchmasteragencydata", fetchAgency);
router.post("/addMasterData", CreateMasterData);
router.get("/getMasterData", GetMasterData)
// router.put("/updateagency", updateAgency);
// router.delete("/delete/:id", deleteAgency);

module.exports = router;
