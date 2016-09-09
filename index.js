var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('contactList', ['contactList']);


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + "/public"));

//Send Contact List
app.get('/contactList', function (request, response) {
	console.log("I received a GET request");

	db.contactList.find(function (err, docs) {
		console.log(docs);
		response.json(docs);
	});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
