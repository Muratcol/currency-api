const asyncErrorWrapper = require("express-async-handler");
const cheerio = require("cheerio");
const axios = require("axios");
let allCryptos = new Array();

const getAllCryptos = asyncErrorWrapper(async (req, res, next) => {
  let url = "https://uk.investing.com/crypto/";
  let response;
  allCryptos = [];
  response = await axios.get(url);
  const $ = await cheerio.load(response.data);
  let table = await $("#fullColumn > div:nth-child(11) > table > tbody > tr");
  for (let i = 1; i < table.length + 1; i++) {
    const name = $(
      `#fullColumn > div:nth-child(11) > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`
    )
      .text()
      .trim();
    const symbol = $(
      `#fullColumn > div:nth-child(11) > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`
    )
      .text()
      .trim();
    const price = $(
      `#fullColumn > div:nth-child(11) > table > tbody > tr:nth-child(${i}) > td:nth-child(4)`
    )
      .text()
      .trim();
    const marketCap = $(
      `#fullColumn > div:nth-child(11) > table > tbody > tr:nth-child(${i}) > td:nth-child(5)`
    )
      .text()
      .trim();
    const vol = $(
      `#fullColumn > div:nth-child(11) > table > tbody > tr:nth-child(${i}) > td:nth-child(6)`
    )
      .text()
      .trim();
    const totalVol = $(
      `#fullColumn > div:nth-child(11) > table > tbody > tr:nth-child(${i}) > td:nth-child(7)`
    )
      .text()
      .trim();
    const chg24 = $(
      `#fullColumn > div:nth-child(11) > table > tbody > tr:nth-child(${i}) > td:nth-child(8)`
    )
      .text()
      .trim();
    const chg7 = $(
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
  return res.status(200).json({
    success: true,
    data: allCryptos,
  });
});

module.exports = {
  getAllCryptos,
};
