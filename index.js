
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');




app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())




app.get('*', function(req, res){
    res.render('index');
})
var port = process.env.PORT || 3000;
app.listen(port)
console.log('Server running on ' + port + '...')