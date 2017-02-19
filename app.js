var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var path = require('path');
var config = require('./config');
var mongoose = require('mongoose');


var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var nest = io.of('nest');

mongoose.connect(config.db, { server:  { keepAlive: 1 }});

var story = require('./controllers/storyController')(nest);
var user = require('./controllers/userController');


app.set('views',(__dirname + '/views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname + '/public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/story', story);
app.use('/user', user);

app.get('*', function(req, res){
	res.render('home', { title: 'Round Robins! Not Squares! '});
});

server.listen(3000, function(){
	console.log('Robins are listening on 3000...');
})