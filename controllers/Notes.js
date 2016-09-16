var pgpLib = require('pg-promise');
var monitor = require('pg-monitor');
var connectionString = require('../config.js');
var note = require('../models/Note.js');

module.exports = function() {

	var options = {
		capTX: true, // capitalize transaction commands;
		extend: function () {
		    // our 'notes' repository extension:
		    this.notes = note(this);
		}
	};
	 
	monitor.attach(options); // attaching to all events;
	monitor.setTheme('matrix'); // changing default theme;
	 
	var pgp = pgpLib(options); // initializing pg-promise;
	 
	// instantiating the database:
	var db = pgp(connectionString);

	return {
		add: function(){
			return function(req, res, next){
				var results = [];

			  // Grab data from http request
			  var dataReceived = {text: req.body.text, complete: false};

			  db.notes.add(dataReceived.text, dataReceived.complete)
			  .then(results => {
			      console.log("INSERT RESULTS:", results);
			      return res.json(results);
			  });

			}
		},
		delete: function(){
			return function(req, res, next){
				var result;

				var dataReceived = {id: req.params.id}

				db.notes.delete(dataReceived.id)
				.then( result => {
					console.log("DELETE RESULT: ", result);
					return res.json(result);
				})
			}
		},
		update: function(){
			return function(req, res, next){
				var results = [];

			  // Grab data from http request
			  var dataReceived = {text: req.body.text, complete: req.body.complete};
			  var note = {id: req.params.id};

			  db.notes.update(dataReceived, note.id)
			  .then(results => {
			     console.log("UPDATE RESULTS:", results);
			     return res.json(results);
			  })
			  .catch(function(error){
			  	console.log("UPDATE ERRORS:", error)
			  	return res.json(error);
			  });

			}
		},
		count: function(){
			return function(req,res, next){
				var results = [];

			  db.notes.count()
			  .then(results => {
			      console.log("RESULTS:", results);
			      return res.json(results);
			  });
			}
		},
		findById: function (idNotes) {
	  return function(req,res,next){
	  	var results = [];

			  // Grab id from URL request
			  var dataReceived = {id: req.params.id};

			  db.notes.findById(dataReceived.id)
			  .then(results => {
			      console.log("RESULTS:", results);
			      return res.json(results);
			  });
	  }
	},
	// A Test function
		ping: function(){
			return function(req, res, next){
				console.log('PING...NOTES');
				return res.status(200).send({results: '...PONG...NOTES', err:null});
			}
		}
	}
}


