const express = require('express');
const router = express.Router();
//const bodyParser = require('body-parser');

const userCtrl = require('../controllers/user');

//router.use(bodyParser.json()); // DOES NOT HANDLE MULTIPART BODIES !!

router.post("/login", userCtrl.logIn);

router.post("/signup", userCtrl.signUp);


module.exports = router;
