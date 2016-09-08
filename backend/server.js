var app   = require('express')();
var http = require('http').Server(app);
var bodyParser = require("body-parser");
var mongo = require('mongoskin');

var db = mongo.db("mongodb://localhost:27017/books", {native_parser:true});

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
		"Data":""
	};
	var db = req.db;
	db.collection('people').find().toArray(function (err, items) {
		if (!!err) {
			data["People"] = "Error fetching data";
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

// app.put('/book',function(req,res){
// 	var Id = req.body.id;
// 	var Bookname = req.body.bookname;
// 	var Authorname = req.body.authorname;
// 	var Price = req.body.price;
// 	var data = {
// 		"error":1,
// 		"Books":""
// 	};
// 	if(!!Bookname && !!Authorname && !!Price){
// 		db.collection('books').update({_id:mongo.helper.toObjectID(Id)}, {$set:{bookname:Bookname,authorname:Authorname,price:Price}}, function(err) {
// 			if(!!err){
// 				data["Books"] = "Error Updating data";
// 				console.log("second");
// 			}else{
// 				data["error"] = 0;
// 				data["Books"] = "Updated Book Successfully";
// 			}
// 			res.json(data);
// 		});
// 	}else{
// 		data["Books"] = "Please provide all required data (i.e : Bookname, Authorname, Price)";
// 		res.json(data);
// 	}
// });

// app.delete('/book/:bookname',function(req,res){
// 	var BookName = req.params.bookname;
// 	var data = {
// 		"error":1,
// 		"Books":""
// 	};
// 	if(!!BookName){
// 		db.collection('books').remove({bookname:BookName}, function(err, result) {
// 			if(!!err){
// 				data["Books"] = "Error deleting data";
// 			}else{
// 				data["error"] = 0;
// 				data["Books"] = "Delete Book Successfully";
// 			}
// 			res.json(data);
// 		});
// 	}else{
// 		data["Books"] = "Please provide all required data (i.e : bookname )";
// 		res.json(data);
// 	}
// });

http.listen(8080,function(){
	console.log("Connected & Listen to port 8080");
});