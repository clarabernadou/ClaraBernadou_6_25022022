//ADD EXPRESS
const express = require('express');
const router = express.Router();

//ADD ROUTE
const stuffCtrl = require('../controllers/stuff');

router.get('/', stuffCtrl.getAllStuff);
router.post('/', stuffCtrl.createThing);
router.get('/:id', stuffCtrl.getOneThing);
router.put('/:id', stuffCtrl.modifyThing);
router.delete('/:id', stuffCtrl.deleteThing);

//EXPORT THE MODULE
module.exports = router;