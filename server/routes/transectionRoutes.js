const express = require('express');
const { addTransection, getallTransection, editTransection, deleteTransection } = require('../controllers/transectionCtrl');

const router = express.Router();


// add transection
router.post('/add-transection', addTransection);

// editable transection
router.post('/edit-transection', editTransection);

router.post('/delete-transection', deleteTransection);

//get transection 
router.post('/get-transection', getallTransection);


module.exports = router;