const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');


router.post("/login", userCtrl.logIn);

router.post("/signup", userCtrl.signUp);

// bonus : RGPD compliant endpoint
router.delete('/deluser/:id', auth, userCtrl.unsubscribe);


module.exports = router;
