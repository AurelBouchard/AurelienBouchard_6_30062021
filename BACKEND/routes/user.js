const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const auth = require('../middleware/auth');


router.post("/login", userController.logIn);

router.post("/signup", userController.signUp);

// bonus : RGPD compliant endpoint
router.delete('/deluser/:id', auth, userController.unsubscribe);


module.exports = router;
