// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.set('port', [5000,4000]);
app.use('/static', express.static(__dirname + '/static'));
// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});
// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});
server.listen(4000, function() {
  console.log('Starting server on port 4000');
});
var users = {};
// Add the WebSocket handlers
io.on('connection', function(socket) {
console.log("Users: "+users.nome);
//if(users != undefined ){
socket.on('disconnect', function() {
	if(users != undefined && users.length > 0){
    io.sockets.emit('info', users[socket.id].nome + " saiu");
	}
  });
//}
});



io.on('connection', function(socket) {
  socket.on('new', function(usr) {
    users[socket.id] = {
     nome: usr,
	 id: socket.id
    };
	console.log("User "+usr+" entrou");
	io.sockets.emit('info', usr+" entrou");
  });
  socket.on('send', function(data) {
	  var user = users[socket.id];
	  
    io.sockets.emit('message', data);
	//console.log(data);
  });
});