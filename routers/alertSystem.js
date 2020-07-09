const express = require('express');
const {getAccessToRoute} = require('../middlewares/authorization/auth');
const {createAlert, deleteAlert} = require('../controllers/alertSystem')
const {checkAlertExist} = require('../middlewares/database/databaseErrorHelpers')
const router = express.Router();
// Block User


router.use([getAccessToRoute]); 

router.post("/createAlert", createAlert);
router.delete('/deleteAlert/:id', checkAlertExist, deleteAlert)
// router.use(checkUserExist);




module.exports = router;