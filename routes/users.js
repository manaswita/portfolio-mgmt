var express = require("express");
var passportObject = require("passport");
var passportLocal = require("passport-local").Strategy;

var router = express.Router();

passportObject.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passportObject.deserializeUser(function(user, done) {
    done(null, user);
  });

var User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('register.html');
});

router.post('/register', (req, res) => {
    var name = req.body.name;
    var userName = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    //validate the input data
    req.checkBody("name"," Name is required ").notEmpty();
    req.checkBody("email"," Email is required ").notEmpty();
    req.checkBody("email"," Invalid email id").isEmail();
    req.checkBody("username"," Username is required ").notEmpty();
    req.checkBody("password"," Password is required ").notEmpty();
    var error = req.validationErrors();

    if(error){
        res.render('register',{error:error});
     }

     //No validation errors
     var user = new User({
        name:name,
        email:email,
        username:userName,
        password:password
     });
     User.createUser(user, function(error,user){
        if(error) throw error;
     });
     
     req.flash('success_message', 'Resisteted Successfully');
     
     res.redirect('/users/login');
});

router.get('/login', (req, res) => {
    res.render('login.html');
});

router.post('/login',
    passportObject.authenticate('local', {successRedirectUrl:"/",failureRedirectUrl:"/users/login", failureFlash :true}),
    function(req, res) {
        
    res.render("./shares.html");
});

router.get('/logout', (req, res) => {
    req.logout();
    
       req.flash('success_message', 'Logged out successfully !! ');
    
       res.redirect('/users/login');
});

passportObject.use(new passportLocal(
    function(username, password, done) {
       //
       User.findByUsername(username, function(error, foundUser){
         if(error) throw error;
         if(!foundUser){
            done(null, false, {msg : 'Auhentication failed, Invalid Username !! '});
         }

         //Validate Password
         User.validatePassword(password, foundUser.password, function(error,found){
            if(found) return done(null, foundUser)
            else done(null, false, {msg : 'Auhentication failed, Invalid Password  !! '});
         })
      });
      //
    }
));

module.exports = router;