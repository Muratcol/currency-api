const express = require('express');
const {getAccessToRoute} = require('../middlewares/authorization/auth');
const {createAlert, deleteAlert, editAlert, getAlerts, sendEmailNotify, getSingleAlert} = require('../controllers/alertSystem')
const {checkAlertExist} = require('../middlewares/database/databaseErrorHelpers')
const router = express.Router();
const cors  = require('cors');
// Block User

router.use(cors())
router.use([getAccessToRoute]); 

router.get("/getAllAlerts", getAlerts);
router.get('/getSingleAlert/:id', getSingleAlert)
router.post("/createAlert", createAlert);
router.delete('/deleteAlert/:id', checkAlertExist, deleteAlert);
router.put('/editAlert/:id', checkAlertExist, editAlert);
router.post('/sendEmailNotify', sendEmailNotify)
// router.use(checkUserExist);




module.exports = router;