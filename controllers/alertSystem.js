const Alert = require("../models/Alert");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");

const createAlert = asyncErrorWrapper(async (req, res, next) => {
  const alertForm = req.body;

  const alert = await Alert.create({
    ...alertForm,
  });

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
module.exports = { createAlert, deleteAlert };
