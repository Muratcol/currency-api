const asyncErrorWrapper = require("express-async-handler");
const cheerio = require("cheerio");
const axios = require("axios");
let allCommodities = new Array();
let commAdvices = new Array();
// document.querySelector("#cross_rate_1 > tbody > tr")

const getAllCommodities = asyncErrorWrapper(async (req, res, next) => {
  let url = "https://uk.investing.com/commodities/real-time-futures";
  let response;
  allCommodities = [];
  response = await axios.get(url);
  const $ = await cheerio.load(response.data);
  let table = await $("#cross_rate_1 > tbody > tr");
  for (let i = 1; i < table.length + 1; i++) {

    const name = $(`#cross_rate_1 > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text().trim();
    const month = $(`#cross_rate_1 > tbody > tr:nth-child(${i}) > td:nth-child(3)`).text().trim();
    const last = $(`#cross_rate_1 > tbody > tr:nth-child(${i}) > td:nth-child(4)`).text().trim();
    const high = $(`#cross_rate_1 > tbody > tr:nth-child(${i}) > td:nth-child(5)`).text().trim();
    const low = $(`#cross_rate_1 > tbody > tr:nth-child(${i}) > td:nth-child(6)`).text().trim();
    const chg = $(`#cross_rate_1 > tbody > tr:nth-child(${i}) > td:nth-child(7)`).text().trim();
    const chgPerc = $(`#cross_rate_1 > tbody > tr:nth-child(${i}) > td:nth-child(8)`).text().trim();
    const time = $(`#cross_rate_1 > tbody > tr:nth-child(${i}) > td:nth-child(9)`).text().trim();
    allCommodities.push({
      name,
      month,
      last,
      high,
      low,
      chg,
      chgPerc,
      time
    });
  }
  return res.status(200).json({
    success: true,
    data: allCommodities,
  });
});

// document.querySelector("#QBS_5_inner")

const getCommAdvices = asyncErrorWrapper(async (req, res, next) => {
  let url = "https://uk.investing.com/currencies/";
  let response;
  commAdvices = [];
  response = await axios.get(url);
  const $ = await cheerio.load(response.data);
  // let table = await $("#cr1 > tbody > tr");
  for (let i of [1,2,3,4,5,6,7]) {

    const name = $(`#QBS_5_inner > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text().trim();
    const last = $(`#QBS_5_inner > tbody > tr:nth-child(${i}) > td:nth-child(3)`).text().trim();
    const chg = $(`#QBS_5_inner > tbody > tr:nth-child(${i}) > td:nth-child(4)`).text().trim();
    const chgPerc = $(`#QBS_5_inner > tbody > tr:nth-child(${i}) > td:nth-child(5)`).text().trim();



    commAdvices.push({
      name,
      last,
      chg,
      chgPerc

    });
  }
  return res.status(200).json({
    success: true,
    data: commAdvices,
  });
});


module.exports = {
  getAllCommodities,
  getCommAdvices
  };