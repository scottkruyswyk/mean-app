var app   = require('express')();
var http = require('http').Server(app);
var bodyParser = require("body-parser");
var mongo = require('mongoskin');

var db = mongo.db("mongodb://localhost:27017/people", {native_parser:true});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req,res,next){
	req.db = db;
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
	next();
});

app.get('/',function(req,res){
	var data = {
		"Data":""
	};
	data["Data"] = "Nothing to see here";
	res.json(data);
});

app.get('/person',function(req,res){
	var data = {
		"People":""
	};
	var db = req.db;
	db.collection('people').find().toArray(function (err, items) {
		if (!!err) {
			data["People"] = "Error fetching data";
			data.error = err;
			res.json(data);
		} else {
			if (!!items && items.length != 0) {
				data["error"] = 0;
				data["People"] = items;
				res.json(data);
			} else {
				data["error"] = 1;
				data["People"] = 'No people found';
				res.json(data);
			}
		}
	});
});

app.post('/person',function(req,res){
	var firstName = req.body.firstname;
	var middleName = req.body.middleName;
	var lastName = req.body.lastname;
	var age = req.body.age;

	var hobbies = req.body.hobbies;

	var data = {
		"error":1,
		"People":""
	};

	if (!!firstName && !!lastName && !!age) {

		var person = {
			firstname:firstName,
			lastname: lastName,
			age: age
		};

		if (!!hobbies) {
			person["hobbie"] = hobbies;
		}

		if (!!middleName) {
			person["middlename"] = middleName;
 		}

		db.collection('people').insert(person, function(err, result) {
			if (!!err) {
				data["People"] = "Error adding data";
			} else {
				data["error"] = 0;
				data["People"] = "Person added successfully";
			}
			res.json(data);
		});
	} else {
		data["People"] = "Please provide at least a first name, last name and age";
		res.json(data);
	}
});

app.put('/person',function(req,res){
	var Id = req.body.id;
	var firstName = req.body.firstname;
	var middleName = req.body.middleName;
	var lastName = req.body.lastname;
	var age = req.body.age;

	var hobbies = req.body.hobbies;

	var data = {
		"error":1,
		"People":""
	};

	if(!!firstName && !!lastName && !!age){

		var updatedPerson = {
			firstname: firstName,
			lastname: lastName,
			age: age
		};

		if (!!hobbies) {
			updatedPerson["hobbie"] = hobbies;
		}

		if (!!middleName) {
			updatedPerson["middlename"] = middleName;
 		}


		db.collection('people').update({_id:mongo.helper.toObjectID(Id)}, {$set:updatedPerson}, function(err) {
			if(!!err){
				data["People"] = "Error Updating data";
			}else{
				data["error"] = 0;
				data["People"] = "Updated Person Successfully";
			}
			res.json(data);
		});
	}else{
		data["People"] = "Please provide at least a first name, last name and age";
		res.json(data);
	}
});

app.delete('/person/:id',function(req,res){
	var id = req.params.id;

	var data = {
		"error":1,
		"People":""
	};

	if(!!id){
		db.collection('people').remove({id: id}, function(err, result) {
			if(!!err){
				data["People"] = "Error deleting data";
			}else{
				data["error"] = 0;
				data["People"] = "Delete Book Successfully";
			}
			res.json(data);
		});
	}else{
		data["People"] = "Please provide a valid person id";
		res.json(data);
	}
});

http.listen(8080,function(){
	console.log("Connected & Listen to port 8080");
});