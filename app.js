var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var path = require('path');

var app = express();

app.set('views',(__dirname + '/views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname + '/public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('*', function(req, res){
	res.render('home', { title: 'Round Robins! Not Squares! '});
});

app.listen(3000, function(){
	console.log('Robins are listening on 3000...');
})