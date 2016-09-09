var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + "/public"));

//Send Contact List
app.get('/contactList', function (request, response) {
	console.log("I received a GET request");


    contact1 ={
    	name:"Tim",
    	email:"tim@mail.com",
    	number:"(111) 111-1111"
    };
    contact2 ={
    	name:"David",
    	email:"dave@mail.com",
    	number:"(222) 222-2222"
    };
    contact3 ={
    	name:"Emily",
    	email:"emily@mail.com",
    	number:"(333) 333-3333"
    };

    var contactList = [contact1, contact2, contact3];
    response.json(contactList);
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
