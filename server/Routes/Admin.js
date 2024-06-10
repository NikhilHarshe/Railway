const express = require("express");
const router = express.Router();

const { Login, SignUp, auth, Delete } = require("../Controller/Admin")

router.post("/Login", Login);
router.post("/SignUp", SignUp);
router.delete("/delete", auth, Delete);

module.exports = router;