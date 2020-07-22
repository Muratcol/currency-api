const Alert = require("../models/Alert");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");
const User = require("../models/User");
const sendEmail = require("../helpers/libraries/sendEmail");

const createAlert = asyncErrorWrapper(async (req, res, next) => {
  const alertForm = req.body;

  const alert = await Alert.create({
    ...alertForm,
    user: req.user.id,
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
  const { id } = req.params;
  const alert = await Alert.findById(id);

  await alert.remove();

  return res.status(200).json({
    success: true,
    message: "Alert deleted succesfully.",
  });
});

const editAlert = asyncErrorWrapper(async (req, res, next) => {
  const getNewAlert = req.body;
  const { id } = req.params;
  const alert = await Alert.findByIdAndUpdate(id, getNewAlert, {
    new: true,
    runValidators: true,
  });
  await alert.save();

  return res.status(200).json({
    success: true,
    message: "Data update succesfull",
  });
});

const sendEmailNotify = asyncErrorWrapper(async (req, res, next) => {
  const alert = await Alert.findById(req.body.id);
  const userId = alert.user;
  const user = await User.findById(userId);

  const emailTemplate = `
        <h3><strong>Executed Price Alert</strong></h3>
        <p><a>${alert.pair}</a> reached ${alert.limit} at (DUMMY HOUR)</p>
    `;
  const subject = `
    ${alert.pair} has reached ${alert.limit}`;

  try {
    await sendEmail({
      from: process.env.GMAIL_ID,
      to: user.email,
      subject: subject,
      html: emailTemplate,
    });
    res.status(200).json({
      success: true,
      message: "Notification sended",
    });
  } catch (err) {
    return next(new CustomError("Email could not be sent", 500));
  }
});

const getAlerts = asyncErrorWrapper(async (req, res, next) => {
  const id = req.user.id;
  const alert = await Alert.find({
    user: id,
  });

  return res.status(200).json({
    success: true,
    data: alert,
  });
});

const getSingleAlert = asyncErrorWrapper(async (req, res, next) => {
  const id = req.params.id;
  const alert = await Alert.findById(id);
  
  return res.status(200).json({
    success: true,
    data: alert
  });
});

module.exports = {
  createAlert,
  deleteAlert,
  editAlert,
  getAlerts,
  sendEmailNotify,
  getSingleAlert
};
