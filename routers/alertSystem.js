const express = require('express');
const {getAccessToRoute} = require('../middlewares/authorization/auth');
const {createAlert, deleteAlert, editAlert} = require('../controllers/alertSystem')
const {checkAlertExist} = require('../middlewares/database/databaseErrorHelpers')
const router = express.Router();
// Block User


router.use([getAccessToRoute]); 

router.post("/createAlert", createAlert);
router.delete('/deleteAlert/:id', checkAlertExist, deleteAlert)
router.put('/editAlert/:id', checkAlertExist, editAlert)
// router.use(checkUserExist);




module.exports = router;