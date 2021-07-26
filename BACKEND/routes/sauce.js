const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const fileManager = require('../middleware/multer-config');
const sauceController = require('../controllers/sauce');

// POST METHODS : Create sauce, add opinion
router.post('/',            auth,   fileManager,    sauceController.create);
router.post('/:id/like',    auth,   sauceController.like);

// GET METHODS : Reach all or one sauces
router.get('/',     auth,   sauceController.getAll);
router.get('/:id',  auth,   sauceController.findById);

// PUT METHOD : Update sauce data
router.put('/:id',  auth,   fileManager,   sauceController.modify);

// DELETE METHOD : Delete sauce
router.delete('/:id',  auth,   sauceController.remove);


module.exports = router;
