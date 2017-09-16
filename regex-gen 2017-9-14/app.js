var path = require('path'),
	express = require('express'),
	app = express(),
	http = require('http'),
	server = http.Server(app);

//Express Middleware for serving static files
app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});