#!/usr/bin/env node
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

require('./router/main')(app);

// Middlewares
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

app.set('views', __dirname);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(process.env.PORT || 8000, function () {
   var port = server.address().port;
   console.log("Server listening on port", port);
});
