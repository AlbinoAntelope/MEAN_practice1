var express = require('express');
var app = express();

var bodyParser = require('body-parser');

//mongo stuff
var mongoose = require('mongoose');
var mongodURI =  'mongodb://heroku_ngrs5bb0:rq4lrabeu1fjmphriqeh37c0g3@ds029106.mlab.com:29106/heroku_ngrs5bb0';
mongoose.connect(mongodURI);
var db = mongoose.connection;
var ContactSchema = mongoose.Schema({
    name     : String,
    email      : String,
    number      : String
});
var contactModel = mongoose.model('Contact', ContactSchema);


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//Send Contact List
app.get('/contactList', function (request, response) {
	console.log("I received a GET request");

	contactModel.find({}, function (err, docs) {
		console.log(docs);
		response.json(docs);
	});
});

//Add Contact to Contact List
app.post('/contactList', function (request, response) {
	console.log(request.body);

	var newContact = new contactModel(request.body);
	newContact.save(function (err) {
		if (err) throw err;
	})
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
