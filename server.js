var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
const customErrorHandler = require('./middlewares/errors/customErrorHandler');
const connectDatabase = require('./helpers/database/connectDatabase');
var appRoutes = require('./routers/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
dotenv.config({
  path: "./config/env/config.env"
});
connectDatabase();

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});
app.use(customErrorHandler)
app.use('/', appRoutes);
app.use(favicon(__dirname + '/public/favicon.ico'));
const PORT = process.env.PORT;
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index');
});

// app.listen(PORT, () => {
//   console.log(`App started on ${PORT}: ${process.env.NODE_ENV}`);
// });
module.exports = app;
