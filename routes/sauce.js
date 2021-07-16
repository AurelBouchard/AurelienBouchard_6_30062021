const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauce');

// POST METHODS : Create sauce, add opinion
router.post('/',            auth,   multer, sauceCtrl.create); //multer
//router.post('/:id/like',    auth,   sauceCtrl.like);

// GET METHODS : Reach all or one sauces
router.get('/',     auth,   sauceCtrl.getAll);
router.get('/:id',  auth,   sauceCtrl.findById);

// PUT METHOD : Update sauce data
router.put('/:id',  auth,   multer,   sauceCtrl.modify);

// DELETE METHOD : Delete sauce
router.delete('/:id',  auth,   sauceCtrl.remove);


module.exports = router;
