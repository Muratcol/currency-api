const asyncErrorWrapper = require("express-async-handler");
const cheerio = require("cheerio");
const axios = require("axios");
let allCurrencies = new Array();

// document.querySelector("#pair_1 > td.pid-1-bid")
// document.querySelector("#pair_1 > td.bold.left.noWrap.elp.plusIconTd")
// document.querySelector("#cr1")

const getAllCurrencies = asyncErrorWrapper(async (req, res, next) => {
  let url = "https://uk.investing.com/currencies/single-currency-crosses";
  let response;
  allCurrencies = [];
  response = await axios.get(url);
  const $ = await cheerio.load(response.data);
  let table = await $("#cr1 > tbody > tr");
  for (let i = 1; i < 40; i++) {

    const pair = $(`#cr1 > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text().trim();
    const bid = $(`#cr1 > tbody > tr:nth-child(${i}) > td:nth-child(3)`).text().trim();
    const ask = $(`#cr1 > tbody > tr:nth-child(${i}) > td:nth-child(4)`).text().trim();
    const high = $(`#cr1 > tbody > tr:nth-child(${i}) > td:nth-child(5)`).text().trim();
    const low = $(`#cr1 > tbody > tr:nth-child(${i}) > td:nth-child(6)`).text().trim();
    const chg = $(`#cr1 > tbody > tr:nth-child(${i}) > td:nth-child(7)`).text().trim();
    const chgPerc = $(`#cr1 > tbody > tr:nth-child(${i}) > td:nth-child(8)`).text().trim();
    const time = $(`#cr1 > tbody > tr:nth-child(${i}) > td:nth-child(9)`).text().trim();
    allCurrencies.push({
      pair,
      bid,
      ask,
      high,
      low,
      chg,
      chgPerc,
      time
    });
  }
  return res.status(200).json({
    success: true,
    data: allCurrencies,
  });
});


module.exports = {
  getAllCurrencies,
};
