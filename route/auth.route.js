const express = require("express");
const { signUp } = require("../controller/auth.controler");
const router = express.Router();




router.post("/signup", signUp);


module.exports = router;