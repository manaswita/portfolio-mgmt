var path = require("path");
var express = require("express");
var handler = require("express-handlebars");
var cookieParser = require("cookie-parser");
var passportObject = require("passport");
var passportLocal = require("passport-local").Strategy;
var validatorObject = require("express-validator");
var bodyParser = require("body-parser");
var flashObject = require("connect-flash");
var sessionObject = require("express-session");
var mongo = require("mongodb");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/portfolio-db");
var connection = mongoose.connection

//Create routes //

var routes = require('./routes/index');
var users =  require('./routes/users');
var shares = require('./routes/shares');
var common = require('./routes/common');

var app = express();

app.set("views", path.join(__dirname, 'views/layouts'))
app.engine("handlebars", handler({defaultLayout:'index'}));
app.set('view engine', "handlebars");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'common')));
app.use(sessionObject({secret:'p@ssw0rd',resave:true}));
app.use(passportObject.initialize());
app.use(passportObject.session());
app.use(validatorObject({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(flashObject());

app.use(function(req, res, next){
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
   res.locals.error = req.flash('error');
   res.locals.user = req.user || null;
    next();
});

app.use("/",routes);
app.use("/users",users);
app.use("/shares",shares);
app.use("/common",common);

app.listen(8777);