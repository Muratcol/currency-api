const express = require('express');
const {getAccessToRoute} = require('../middlewares/authorization/auth');
const {createAlert, deleteAlert, editAlert, getAlerts} = require('../controllers/alertSystem')
const {checkAlertExist} = require('../middlewares/database/databaseErrorHelpers')
const router = express.Router();
const cors  = require('cors');
// Block User

router.use(cors())
router.use([getAccessToRoute]); 

router.get("/getAllAlerts", getAlerts);
router.post("/createAlert", createAlert);
router.delete('/deleteAlert/:id', checkAlertExist, deleteAlert)
router.put('/editAlert/:id', checkAlertExist, editAlert)
// router.use(checkUserExist);




module.exports = router;