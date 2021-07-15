const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');


router.post("/login", userCtrl.logIn);

router.post("/signup", userCtrl.signUp);


module.exports = router;
