const router = require('express').Router();
const verifierController = require('../controllers/verifierController');
const multer = require("multer");

const upload = multer();

router.get('/', verifierController.getQRCode);

router.get('/:id', verifierController.getChallenge);

router.post('/:id', upload.none(), verifierController.verify);

module.exports = router;
