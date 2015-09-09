
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var distance = require('./server/services-maps/service-maps.js');
var mailer = require('./server/service-mailer');
var contactMail = require('./server/service-contact-mailer.js');
var paypal = require('./server/ppal.js');



app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
})

distance.distance(app)
mailer.mailer(app)
contactMail.mailer(app)

app.get('/paymentCard', function(req,res){

    return paypal.paymentWithCard(req, res);
});

app.get('*', function(req, res){
    res.render('index');
})

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('Server running on ' + port );
})
