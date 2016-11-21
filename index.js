'use strict';

var	http = require('http'),
	fs = require('fs'),
	path = require('path'),
	mime = require('mime'),
	cache = {};

function send404(response) {
	response.writeHead(404, {'Context-Type': 'text/plain'});
	response.write('Error 404: resource not found');
	response.end();
}

function sendFile(response, filePath, fileContents) {
	response.writeHead(200, {"content-type": mime.lookup(path.basename(filePath))} );
	response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
	if (cache[absPath]) {
		sendFile(response, absPath, cache[absPath]);
	}
	else {
		fs.exists(absPath, function(exists) {
			if (exists) {
				fs.readFile(absPath, function(err, data) {
					if (err) {
						send404(response);
					} else {
						cache[absPath] = data;
						sendFile(response, absPath, data);
					}
				});
			}
			else {
				send404(response);
			}
		});
	}
}

var server = http.createServer(function(request, response) {
	var filePath = false;
	if (request.url == '/') {
		filePath = 'index.html';
	} else {
		filePath = request.url;
	}

	var absPath = './' + filePath;

	serveStatic(response, cache, absPath);
});

var port = process.env.PORT || 3000;

server.listen(port, function() {
	console.log("Server listening on port " + port + ".");
});
