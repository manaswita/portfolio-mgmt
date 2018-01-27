var express = require("express");

var router = express.Router();


var common = require("./common");
var shares = require('../models/shares');

router.get('/', (req, res) => {
    res.render('index.html');
});

/*router.get('/shares', (req, res) => {
    res.render('shares');
});*/



module.exports = router;