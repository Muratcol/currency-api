const express = require('express');
const {register, getUser, login, logout, imageUpload, forgotPassword, resetpassword, editDetails, isLoggedIn} = require('../controllers/auth');
const {getAccessToRoute} = require('../middlewares/authorization/auth')
const profileImageUpload = require('../middlewares/libraries/profileImageUpload');
const cors  = require('cors');
// api/auth will come here 


const router = express.Router();
// router.post("URL", MIDDLEWARE, CONTROLLER)
router.use(cors())
router.post("/register", register);
router.get('/profile', getAccessToRoute, getUser);
router.post('/login', login);
router.get('/logout', getAccessToRoute, logout);
router.post('/upload', [getAccessToRoute, profileImageUpload.single("profile_image")], imageUpload);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword', resetpassword);
router.put('/edit', getAccessToRoute, editDetails);
router.get('/isLoggedIn', isLoggedIn);
module.exports = router;