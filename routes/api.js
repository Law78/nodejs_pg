var express = require('express');

/*
CREATE /api/v1/____ POST
*/

var api = {
	notes: function(){
		var router = express.Router();
		var controller = require('../controllers/Notes')();
		console.log('Notes route loaded.')
		// CREATE
		router.route('/').post(controller.add());
		// DELETE
		router.route('/:id').delete(controller.delete());
		// UPDATE
		router.route('/:id').put(controller.update());
		
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