var express = require('express');

var api = {
	notes: function(){
		var router = express.Router();
		var controller = require('../controllers/Notes')();
		console.log('Notes route loaded.')
		router.route('/').post(controller.add());
		router.route('/find/:id').get(controller.findById());
		router.route('/count').get(controller.count());
		router.route('/ping').get(controller.ping());
		return router;
	},
	users: function(){
		var router = express.Router();
		var controller = require('../controllers/Users')();
		console.log('Users route loaded.')
		router.route('/ping').get(controller.ping());
		return router;
	}
}

module.exports = api;