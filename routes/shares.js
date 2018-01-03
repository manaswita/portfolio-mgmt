var express = require("express");

var router = express.Router();
var common = require("./common");
var shares = require('../models/shares');
var yahooFinance = require('yahoo-finance');
//var googleStocks = require('google-stocks');

router.get('/list', (req, res) => {
    res.render('index');
});

router.post('/data', (req, res) => {
    yahooFinance.historical({
      symbol: 'AAPL',
      from: '2012-01-01',
      to: '2012-12-31'
    }, function (err, quotes) {
      console.log(quotes);
    });
   
      res.redirect('/shares/list');
  });

module.exports = router;