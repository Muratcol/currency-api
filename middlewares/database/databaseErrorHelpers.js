const User = require("../../models/User");
const CustomError = require("../../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const checkUserExist = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user)
    return next(new CustomError("There is no such an user with that id", 400));

  req.data = user;
  next();
});

const checkAlertExist = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const alert = await User.findById(id);

  if (!user)
    return next(new CustomError("There is no such an alert with that id", 400));

  req.data = alert;
  next();
});

module.exports = {
  checkUserExist,
  checkAlertExist,
};
