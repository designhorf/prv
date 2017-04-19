'use strict';

var	http = require('http'),
	ejs = require('ejs'),
	express = require('express'),
    app = express(),
	fs = require('fs'),
	path = require('path'),
	mime = require('mime'),
	cookieParser = require('cookie-parser'),
	cache = {};


// var server = http.createServer(function(request, response) {
// 	var filePath = false;
// 	if (request.url == '/') {
// 		filePath = './test/index.html';
// 	} else {
// 		filePath = request.url;
// 	}

// 	var absPath = './' + filePath;

// 	serveStatic(response, cache, absPath);
// });

// var port = process.env.PORT || 3000;

// server.listen(port, function() {
// 	console.log("Server listening on port " + port + ".");
// });


// Middlewares
app.use(cookieParser());
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'public')));



// app.get('/', function(req, res) {


	// res.send('./test/index.html');
// });

require('./router/main')(app);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

;

var server = app.listen(process.env.PORT || 8000, function () {
   var port = server.address().port;
   console.log("Server listening on port", port);
});
