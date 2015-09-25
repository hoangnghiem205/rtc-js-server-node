var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});

server.listen(3000, function() { 
	 console.log((new Date()) + " Server is listening on port 3000");
});

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
	console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

    // accept connection - you should check 'request.origin' to make sure that
    // client is connecting from your website
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
    var connection = request.accept(null, request.origin); 

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
    	console.log('Receved a message ', message);
        if (message.type === 'utf8') {
            // process WebSocket message
            // connection.sendUTF(JSON.stringify({ type:'color', data: userColor }));
            connection.sendUTF(message.utf8Data);
        }
    });

    connection.on('close', function(connection) {
        // close user connection
    });
});