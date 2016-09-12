var mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	birthday: Date
});

var Person = mongoose.model('Person', PersonSchema);

module.exports = Person