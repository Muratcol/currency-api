const Alert = require("../models/Alert");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");
const User = require("../models/User");

const createAlert = asyncErrorWrapper(async (req, res, next) => {
  const alertForm = req.body;

  const alert = await Alert.create({
    ...alertForm,
    user: req.user.id
  });

  const id = req.user.id;

  const user = await User.findById(id);

  user.alerts.push(alert._id);
  await user.save();


  res.status(200).json({
    success: true,
    data: alert,
  });
});

const deleteAlert = asyncErrorWrapper(async (req, res, next) => {

    const {id} = req.params;
    const alert = await Alert.findById(id);

    await alert.remove();

    return res.status(200)
    .json({
        success: true,
        message: "Alert deleted succesfully."
    });

});

const editAlert = asyncErrorWrapper(async(req, res, next) => {
  const getNewAlert = req.body;
  const {id} = req.params;
  const alert = await Alert.findByIdAndUpdate ( id, getNewAlert, {
      new: true,
      runValidators: true
  });
  await alert.save()

  return res.status(200)
  .json({
      success :  true,
      message : "Data update succesfull"
  });
});

const sendEmailNotify = asyncErrorWrapper(async (req, res, next) => {
  const id = req.body;
  const alert = await Alert.findById(id);
  const userId = alert.user;
  const user = await User.findById(userId);
  console.log(user);
})

const getAlerts = asyncErrorWrapper(async (req, res, next) => {

  const id = req.user.id;
  const alert = await Alert.find( {
    user: id
  });

  return res.status(200)
  .json({
      success: true,
      data: alert
  });
});


module.exports = { createAlert, deleteAlert, editAlert, getAlerts, sendEmailNotify };
