const express = require("express");
const cors = require('cors')

const router = express.Router();

router.use(cors());

const {
  getGlanceForex, getForexAdvices, getCurrencies
} = require("../helpers/currencyScrapper/forex.finder");
const {
  updateChart
} = require('../helpers/currencyScrapper/chartData');
const { getAllCommodities, getCommAdvices } = require("../helpers/currencyScrapper/commodity_finder");
const { getAllIndices, getShortShares } = require("../helpers/currencyScrapper/majorIndices_finder")
const { getAllCryptos } = require("../helpers/currencyScrapper/crypto_finder");
const {getAllCurrenciesForMain} = require("../helpers/currencyScrapper/getAllCurrencies");


router.get("/all-currencies", getAllCurrenciesForMain)
router.get("/glance-forex", getGlanceForex);
router.get("/get-forex-advices", getForexAdvices);
router.get("/get-comm-advices", getCommAdvices);
router.get('/chart-data', updateChart);
router.get('/commodities', getAllCommodities);
router.get('/major-indices', getAllIndices);
router.get('/cryptos', getAllCryptos);
router.get('/short-shares', getShortShares);

module.exports = router;
