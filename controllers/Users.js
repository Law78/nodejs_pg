module.exports = function() {
	return {
		ping: function(){
			return function(req, res, next){
				console.log('PING...USERS');
				return res.status(200).send({results: '...PONG..USERS', err:null});
			}
		}
	}
}