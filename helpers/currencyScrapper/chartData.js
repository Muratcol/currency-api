const asyncErrorWrapper = require("express-async-handler");
const cheerio = require("cheerio");
const axios = require("axios");
const Currency = require("../../models/Currency");
const CustomError = require("../../helpers/error/CustomError");
let allCurrencies = new Array();

const chartData = asyncErrorWrapper(async (req, res, next) => {
  let url = "https://kur.doviz.com/";
  let response;
  allCurrencies = [];
  response = await axios.get(url);
  const $ = await cheerio.load(response.data);
  let denemeler = await $("#currencies tbody tr");
  for (let i = 1; i <= 3; i++) {
    const buy = $(`tr:nth-child(${i}) > td:nth-child(2)`).text().trim();
    const sell = $(`tr:nth-child(${i}) > td:nth-child(3)`).text().trim();
    const update = $(`tr:nth-child(${i}) > td:nth-child(7)`).text().trim();
    allCurrencies.push({
      buy,
      sell,
      update,
    });
  }

  await Currency.create({
    dollar: allCurrencies[0],
    euro: allCurrencies[1],
    gbp: allCurrencies[2],
  });
});

setInterval(() => {
  chartData();
}, 60 * 15 * 1000);

const updateChart = asyncErrorWrapper(async (req, res, next) => {
  const chartDatas = await Currency.find();

  if (chartDatas.length === 0)
    return next(new CustomError("No new data in database", 404));

  return res.status(200).json({
    success: true,
    data: chartDatas,
  });
});

module.exports = {
  updateChart,
};
