

const asyncErrorWrapper = require("express-async-handler");
const cheerio = require("cheerio");
const axios = require("axios");
let allCurrencies = new Array();


const getAllIndices = asyncErrorWrapper(async (req, res, next) => {
  let url = "https://uk.investing.com/indices/major-indices";
  let response;
  allIndices = [];
  response = await axios.get(url);
  const $ = await cheerio.load(response.data);
  let table = await $("#cross_rates_container > table > tbody > tr");
  for (let i = 1; i < table.length + 1; i++) {

    const index = $(`#cross_rates_container > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text().trim();
    const last = $(`#cross_rates_container > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`).text().trim();
    const high = $(`#cross_rates_container > table > tbody > tr:nth-child(${i}) > td:nth-child(4)`).text().trim();
    const low = $(`#cross_rates_container > table > tbody > tr:nth-child(${i}) > td:nth-child(5)`).text().trim();
    const chg = $(`#cross_rates_container > table > tbody > tr:nth-child(${i}) > td:nth-child(6)`).text().trim();
    const chgPerc = $(`#cross_rates_container > table > tbody > tr:nth-child(${i}) > td:nth-child(7)`).text().trim();
    const time = $(`#cross_rates_container > table > tbody > tr:nth-child(${i}) > td:nth-child(8)`).text().trim();

    allIndices.push({
      index,
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
    data: allIndices,
  });
});


module.exports = {
    getAllIndices,
};
