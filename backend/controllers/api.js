var Person = require('../models/person');

var post = function(req, res) {
    new Person({
    	firstName: req.body.firstName,
    	lastName: req.body.lastName,
    	birthday: new Date(req.body.birthday)
    }).save();
}

var list = function(req, res) {
  Person.find(function(err, people) {
    res.send(people);
  });
}

var findById = function(req, res) {
    Person.findOne({_id: req.params.id}, function(error, person) {
        res.send([{person: person}]);
    });
}

module.exports = {
    post: post,
    list: list,
    findById: findById
}