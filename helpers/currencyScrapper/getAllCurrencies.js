var asyncErrorWrapper = require("express-async-handler");
var cheerio = require("cheerio");
var axios = require("axios");
var glanceCurrencies = new Array();
var forexAdvices = new Array();
const { performance } = require("perf_hooks");
const { promiseImpl } = require("ejs");

var getAllCurrenciesForMain = asyncErrorWrapper(async (req, res, next) => {
  const url0 = "https://uk.investing.com/currencies/";
  const url1 = "https://uk.investing.com/indices/major-indices";
  const url2 = "https://uk.investing.com/commodities/real-time-futures";
  const url3 = "https://uk.investing.com/crypto/";
  let pompa = await Promise.all([
    axios.get(url0),
    axios.get(url1),
    axios.get(url2),
    axios.get(url3),
  ]);
  let response0 = pompa[0];
  let response1 = pompa[1];
  let response2 = pompa[2];
  let response3 = pompa[3];

  glanceCurrencies = [];
  var response = response0

  var $ = await cheerio.load(response.data);

  var table = await $("#cr1 > tbody > tr");

  for (var i = 1; i < table.length; i++) {
    var pair = $(`#cr1 > tbody > tr:nth-child(${i}) > td:nth-child(2)`)
      .text()
      .trim();
    var bid = $(`#cr1 > tbody > tr:nth-child(${i}) > td:nth-child(3)`)
      .text()
      .trim();
    var ask = $(`#cr1 > tbody > tr:nth-child(${i}) > td:nth-child(4)`)
      .text()
      .trim();
    var chg = $(`#cr1 > tbody > tr:nth-child(${i}) > td:nth-child(7)`)
      .text()
      .trim();
    var time = $(`#cr1 > tbody > tr:nth-child(${i}) > td:nth-child(9)`)
      .text()
      .trim();
    glanceCurrencies.push({
      pair,
      bid,
      ask,
      chg,
      time,
    });
  }

  forexAdvices = [];
  for (var i of [1, 2, 3, 5, 7, 9, 10]) {
    var pair = $(
      `#TSB_1_inner > table > tbody > #TSB_pair_${i} > td:nth-child(3)`
    )
      .text()
      .trim();
    var last = $(
      `#TSB_1_inner > table > tbody > #TSB_pair_${i} > td:nth-child(4)`
    )
      .text()
      .trim();
    var advice = $(
      `#TSB_1_inner > table > tbody > #TSB_pair_${i} > td:nth-child(5)`
    )
      .text()
      .trim();

    forexAdvices.push({
      pair,
      last,
      advice,
    });
  }
  shortShares = [];
  for (var i of [1, 2, 3, 4, 5, 6, 7]) {
    var name = $(`#QBS_5_inner > tbody > tr:nth-child(${i}) > td:nth-child(2)`)
      .text()
      .trim();
    var last = $(`#QBS_5_inner > tbody > tr:nth-child(${i}) > td:nth-child(3)`)
      .text()
      .trim();
    var chg = $(`#QBS_5_inner > tbody > tr:nth-child(${i}) > td:nth-child(4)`)
      .text()
      .trim();
    var chgPerc = $(
      `#QBS_5_inner > tbody > tr:nth-child(${i}) > td:nth-child(5)`
    )
      .text()
      .trim();

    shortShares.push({
      name,
      last,
      chg,
      chgPerc,
    });
  }
  commAdvices = [];
  for (var i of [1, 2, 3, 4, 5, 6, 7]) {
    var name = $(`#QBS_5_inner > tbody > tr:nth-child(${i}) > td:nth-child(2)`)
      .text()
      .trim();
    var last = $(`#QBS_5_inner > tbody > tr:nth-child(${i}) > td:nth-child(3)`)
      .text()
      .trim();
    var chg = $(`#QBS_5_inner > tbody > tr:nth-child(${i}) > td:nth-child(4)`)
      .text()
      .trim();
    var chgPerc = $(
      `#QBS_5_inner > tbody > tr:nth-child(${i}) > td:nth-child(5)`
    )
      .text()
      .trim();

    commAdvices.push({
      name,
      last,
      chg,
      chgPerc,
    });
  }
  allIndices = [];
    response = response1;
  var $ = await cheerio.load(response.data);
  var table = await $("#cross_rates_container > table > tbody > tr");
  for (var i = 1; i < table.length + 1; i++) {
    var index = $(
      `#cross_rates_container > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`
    )
      .text()
      .trim();
    var last = $(
      `#cross_rates_container > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`
    )
      .text()
      .trim();
    var high = $(
      `#cross_rates_container > table > tbody > tr:nth-child(${i}) > td:nth-child(4)`
    )
      .text()
      .trim();
    var low = $(
      `#cross_rates_container > table > tbody > tr:nth-child(${i}) > td:nth-child(5)`
    )
      .text()
      .trim();
    var chg = $(
      `#cross_rates_container > table > tbody > tr:nth-child(${i}) > td:nth-child(6)`
    )
      .text()
      .trim();
    var chgPerc = $(
      `#cross_rates_container > table > tbody > tr:nth-child(${i}) > td:nth-child(7)`
    )
      .text()
      .trim();
    var time = $(
      `#cross_rates_container > table > tbody > tr:nth-child(${i}) > td:nth-child(8)`
    )
      .text()
      .trim();

    allIndices.push({
      index,
      last,
      high,
      low,
      chg,
      chgPerc,
      time,
    });
  }

  allCryptos = [];
  response = response2;
  var $ = await cheerio.load(response.data);
  var table = await $("#fullColumn > div:nth-child(11) > table > tbody > tr");
  for (var i = 1; i < table.length + 1; i++) {
    var name = $(
      `#fullColumn > div:nth-child(11) > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`
    )
      .text()
      .trim();
    var symbol = $(
      `#fullColumn > div:nth-child(11) > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`
    )
      .text()
      .trim();
    var price = $(
      `#fullColumn > div:nth-child(11) > table > tbody > tr:nth-child(${i}) > td:nth-child(4)`
    )
      .text()
      .trim();
    var marketCap = $(
      `#fullColumn > div:nth-child(11) > table > tbody > tr:nth-child(${i}) > td:nth-child(5)`
    )
      .text()
      .trim();
    var vol = $(
      `#fullColumn > div:nth-child(11) > table > tbody > tr:nth-child(${i}) > td:nth-child(6)`
    )
      .text()
      .trim();
    var totalVol = $(
      `#fullColumn > div:nth-child(11) > table > tbody > tr:nth-child(${i}) > td:nth-child(7)`
    )
      .text()
      .trim();
    var chg24 = $(
      `#fullColumn > div:nth-child(11) > table > tbody > tr:nth-child(${i}) > td:nth-child(8)`
    )
      .text()
      .trim();
    var chg7 = $(
      `#fullColumn > div:nth-child(11) > table > tbody > tr:nth-child(${i}) > td:nth-child(9)`
    )
      .text()
      .trim();

    allCryptos.push({
      name,
      symbol,
      price,
      marketCap,
      vol,
      totalVol,
      chg24,
      chg7,
    });
  }

  allCommodities = [];
  response = response3;
  var $ = await cheerio.load(response.data);
  var table = await $("#cross_rate_1 > tbody > tr");
  for (var i = 1; i < table.length + 1; i++) {
    var name = $(`#cross_rate_1 > tbody > tr:nth-child(${i}) > td:nth-child(2)`)
      .text()
      .trim();
    var month = $(
      `#cross_rate_1 > tbody > tr:nth-child(${i}) > td:nth-child(3)`
    )
      .text()
      .trim();
    var last = $(`#cross_rate_1 > tbody > tr:nth-child(${i}) > td:nth-child(4)`)
      .text()
      .trim();
    var high = $(`#cross_rate_1 > tbody > tr:nth-child(${i}) > td:nth-child(5)`)
      .text()
      .trim();
    var low = $(`#cross_rate_1 > tbody > tr:nth-child(${i}) > td:nth-child(6)`)
      .text()
      .trim();
    var chg = $(`#cross_rate_1 > tbody > tr:nth-child(${i}) > td:nth-child(7)`)
      .text()
      .trim();
    var chgPerc = $(
      `#cross_rate_1 > tbody > tr:nth-child(${i}) > td:nth-child(8)`
    )
      .text()
      .trim();
    var time = $(`#cross_rate_1 > tbody > tr:nth-child(${i}) > td:nth-child(9)`)
      .text()
      .trim();
    allCommodities.push({
      name,
      month,
      last,
      high,
      low,
      chg,
      chgPerc,
      time,
    });
  }

  return res.status(200).json({
    success: true,
    glanceCurrencies,
    forexAdvices,
    allIndices,
    shortShares,
    allCryptos,
    allCommodities,
    commAdvices,
  });
});

module.exports = {
  getAllCurrenciesForMain,
};
