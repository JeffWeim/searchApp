var express = require('express');
var cheerio = require('cheerio');
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3001;

// Middleware --------------------------
app.use(express.static(path.join(__dirname, 'public'))); // make everything in /public available b/c it's static
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html')
});

app.get('/info', function(request, response) {
	var url = 'https://ajax.googleapis.com/ajax/services/feed/find?v=1.0&q=abercrombie';
	var myData = null;

	getMyData(url, function(res) {
		myData = res;
		response.json(myData)
	})
});

app.post('/info-search', function(request, response) {
	var url = 'https://ajax.googleapis.com/ajax/services/feed/find?v=1.0&q=' + request.body.query;
	var myData = null;

	getMyData(url, function(res) {
		myData = res;
		response.json(myData)
	})

});

app.listen(PORT, function() {
  console.log("Server is up and running on port: " + PORT)
});


// Helper Functions --------------------
var getMyData = function(url, callback) {

	request(url, function(error, response, data) {

		if (!error && response.statusCode == 200) {

			var dataJSON = JSON.parse(data);

		} else if (error) {
			console.log(error);
		}

		return callback(dataJSON);
	});
};