
'use strict';

var express = require('express'),
    app = express();
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))

app.get('*', function(req, res){
    res.render('index');
})

app.listen(3000)
console.log('Server running on port 3000 ...')