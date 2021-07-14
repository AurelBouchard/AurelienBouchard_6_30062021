const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user");

router.post("/signup", auth, userCtrl.signIn);
router.post("/login", auth, userCtrl.logIn);


module.exports = router;
