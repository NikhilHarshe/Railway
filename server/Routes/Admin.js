const express = require("express");
const router = express.Router();

const { Login, SignUp, auth, Delete, getUserDetails } = require("../Controller/Admin")

router.post("/Login", Login);
router.post("/SignUp", SignUp);
router.delete("/delete", auth, Delete);
router.post("/getUserDetails", auth, getUserDetails);

module.exports = router;