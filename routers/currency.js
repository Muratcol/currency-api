const express = require("express");
const cors = require('cors')

const router = express.Router();

router.use(cors());

const {
  getGlanceForex, getForexAdvices,
} = require("../helpers/currencyScrapper/forex.finder");
const {
  updateChart
} = require('../helpers/currencyScrapper/chartData');
const { getAllCommodities } = require("../helpers/currencyScrapper/commodity_finder");
const { getAllIndices } = require("../helpers/currencyScrapper/majorIndices_finder")
const { getAllCryptos } = require("../helpers/currencyScrapper/crypto_finder")



router.get("/glance-forex", getGlanceForex);
router.get("/get-forex-advices", getForexAdvices)
router.get('/chart-data', updateChart);
router.get('/commodities', getAllCommodities);
router.get('/major-indices', getAllIndices);
router.get('/cryptos', getAllCryptos);

module.exports = router;
