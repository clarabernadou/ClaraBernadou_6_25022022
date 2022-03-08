//ADD EXPRESS
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/registrer', userCtrl.signup);
router.post('/login', userCtrl.signIn);
router.get('/logout', userCtrl.logout);

module.exports = router;
