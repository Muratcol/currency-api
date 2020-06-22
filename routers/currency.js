const express = require("express");
const cors = require('cors')

const router = express.Router();

router.use(cors());

const {
  getAllCurrencies,
} = require("../helpers/currencyScrapper/currency_finder");
const {
  updateChart
} = require('../helpers/currencyScrapper/chartData');
const { getAllCommodities } = require("../helpers/currencyScrapper/commodity_finder");
const { getAllIndices } = require("../helpers/currencyScrapper/majorIndices_finder")




router.get("/", getAllCurrencies);
router.get('/chart-data', updateChart);
router.get('/commodities', getAllCommodities);
router.get('/major-indices', getAllIndices);

module.exports = router;
