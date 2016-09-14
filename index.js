var express = require('express');
var app = express();

var bodyParser = require('body-parser');
//mongo stuff
var mongoose = require('mongoose');
var mongodURI =  'mongodb://heroku_ngrs5bb0:rq4lrabeu1fjmphriqeh37c0g3@ds029106.mlab.com:29106/heroku_ngrs5bb0';
mongoose.connect(mongodURI);
var db = mongoose.connection;
var ContactSchema = mongoose.Schema({
	name : {
    	type: String, required: true,
    	validate: {
          validator: function(v) {
            return /^.+$/.test(v);
          },
          message: '{VALUE} is not a name!'}},
    email : {
    	type: String, required: true,
    	validate: { validator: function(v) {
          	//Validate email close to what the input box validates by default
          	//(no special characters except for -, and even then not at the start or end of words past the @)
            return /^([\w\x2d]+\x2E)*[\w\x2d]+@((\w+\x2d*)*\w\x2E)*(\w+\x2d*)*\w$/.test(v);
          },
          message: '{VALUE} is not a valid email!'}}, 
    number : {
    	type: String, required: true,
    	validate: {
          validator: function(v) {
            return /^\x28\d\d\d\x29\x20\d\d\d\x2d\d\d\d\d$/.test(v);
          },
          message: '{VALUE} is not a valid phone number!' }}
});
var contactModel = mongoose.model('Contact', ContactSchema);


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//Send Contact List
app.get('/contactList', function (request, response) {
	console.log("I received a GET request");

	contactModel.find({}, function (err, docs) {
		ifNoErr(err, function () {
			response.json(docs);
		});
	});
});

//Send a single contact
app.get('/contactList/:id', function (request, response) {
	var id = request.params.id;
	console.log(id);
	contactModel.findOne({_id:id}, function (err, docs) {
		ifNoErr(err, function () {
			console.log(docs);
			response.json(docs);
		});
	});
});

//update a single contact
app.put('/contactList/:id', function (request, response) {
	var id = request.params.id;
	contact = request.body;
	console.log(id);
	contactModel.findById(id, function (err, oldContact) {
		ifNoErr(err, function () {
			oldContact.name = contact.name; 
			oldContact.email = contact.email;
			oldContact.number = contact.number;

			oldContact.save(function (err, updatedContact) {
				ifNoErr(err, function () {
					response.json(updatedContact);
				});
			});
		});
	});
});

//Add Contact to Contact List
app.post('/contactList', function (request, response) {
	console.log(request.body);

	var newContact = new contactModel(request.body);
	newContact.save().then(function (docs) {
		console.log("Contact saved");
		response.json(docs);
	}, function (err) {
		ifNoErr(err, function () {});
	});
	console.log("status:");
	console.log(response.statusCode);
});

//remove Contact from Contact List
app.delete('/contactList/:id', function (request, response) {
	var id = request.params.id;
	console.log(id);
	contactModel.remove({_id:id}, function (err, docs) {
		ifNoErr(err, function () {
			console.log("contact deleted")
			response.json(docs);
		});
	});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//really ghetto error handler
function ifNoErr (err, callback) {
	if (err) {
		console.log(err);
	} else{
		callback();
	};
}