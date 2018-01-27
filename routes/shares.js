var express = require("express");

var router = express.Router();
var common = require("./common");
var shares = require('../models/shares');
var yahooFinance = require('yahoo-finance');
//var googleStocks = require('google-stocks');

router.get('/list', (req, res) => {
console.log(req.body);
    getShares(req,res);
    res.render('index.html');
});

function getShares(req, res) {
    yahooFinance.quote({
        symbol: req.body.text,
        modules: [ 'price', 'summaryDetail' ]
      }, function (err, quotes) {
        //console.log(quotes);
        res.json(quotes);
      });

};

// application -------------------------------------------------------------
    router.get('*', function (req, res) {
        res.sendFile(__dirname + '/client/views/shares.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

router.post('/data', (req, res) => {
    /*yahooFinance.historical({
      symbol: 'AAPL',
      from: '2012-01-01',
      to: '2012-12-31'
    }, function (err, quotes) {
      console.log(quotes);
    });*/
    yahooFinance.quote({
        symbol: req.body.text,
        modules: [ 'price'/*, 'summaryDetail' */]
      }, function (err, quotes) {
        console.log(quotes);
        res.json(quotes);
      });


  });

module.exports = router;