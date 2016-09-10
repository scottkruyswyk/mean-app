// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
//var morgan     = require('morgan');

// configure app
//app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8080;

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/people"); // connect to our database
var Person = require('./models/person');


// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
	
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /people
// ----------------------------------------------------
router.route('/people')

	// create a person (accessed at POST http://localhost:8080/people)
	.post(function(req, res) {
		
		var person = new Person();		// create a new instance of the person model
		person.name = req.body.firstName;  // set the people name (comes from the request)

		Person.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'person created!' });
		});

		
	})

	// get all the people (accessed at GET http://localhost:8080/api/people)
	.get(function(req, res) {
		Person.find(function(err, people) {
			if (err)
				res.send(err);

			res.json(people);
		});
	});

// on routes that end in /people/:person_id
// ----------------------------------------------------
router.route('/people/:person_id')

	// get the person with that id
	.get(function(req, res) {
		Person.findById(req.params.person_id, function(err, person) {
			if (err)
				res.send(err);
			res.json(person);
		});
	})

	// update the person with this id
	.put(function(req, res) {
		Person.findById(req.params.person_id, function(err, person) {

			if (err)
				res.send(err);

			person.name = req.body.name;
			person.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'person updated!' });
			});

		});
	})

	// delete the person with this id
	.delete(function(req, res) {
		Person.remove({
			_id: req.params.person_id
		}, function(err, person) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);