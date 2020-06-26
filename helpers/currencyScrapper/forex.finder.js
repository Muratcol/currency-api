const asyncErrorWrapper = require("express-async-handler");
const cheerio = require("cheerio");
const axios = require("axios");
let glanceCurrencies = new Array();
let forexAdvices = new Array();

const getGlanceForex = asyncErrorWrapper(async (req, res, next) => {
  let url = "https://uk.investing.com/currencies/";
  let response;
  glanceCurrencies = [];
  response = await axios.get(url);
  const $ = await cheerio.load(response.data);
  let table = await $("#cr1 > tbody > tr");
  for (let i = 1; i < table.length; i++) {

    const pair = $(`#cr1 > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text().trim();
    const bid = $(`#cr1 > tbody > tr:nth-child(${i}) > td:nth-child(3)`).text().trim();
    const ask = $(`#cr1 > tbody > tr:nth-child(${i}) > td:nth-child(4)`).text().trim();
    const chg = $(`#cr1 > tbody > tr:nth-child(${i}) > td:nth-child(7)`).text().trim();
    const time = $(`#cr1 > tbody > tr:nth-child(${i}) > td:nth-child(9)`).text().trim();
    glanceCurrencies.push({
      pair,
      bid,
      ask,
      chg,
      time
    });
  }
  return res.status(200).json({
    success: true,
    data: glanceCurrencies,
  });
});


const getForexAdvices = asyncErrorWrapper(async (req, res, next) => {
  let url = "https://uk.investing.com/currencies/";
  let response;
  forexAdvices = [];
  response = await axios.get(url);
  const $ = await cheerio.load(response.data);
  // let table = await $("#cr1 > tbody > tr");
  for (let i of [1,2,3,5,7,9,10]) {

    const pair = $(`#TSB_1_inner > table > tbody > #TSB_pair_${i} > td:nth-child(3)`).text().trim();
    const last = $(`#TSB_1_inner > table > tbody > #TSB_pair_${i} > td:nth-child(4)`).text().trim();
    const advice = $(`#TSB_1_inner > table > tbody > #TSB_pair_${i} > td:nth-child(5)`).text().trim();

    forexAdvices.push({
      pair,
      last,
      advice

    });
  }
  return res.status(200).json({
    success: true,
    data: forexAdvices,
  });
});


module.exports = {
  getGlanceForex,
  getForexAdvices
};
