var assert = require('assert');

function validator(number){
	if (number < 0) 
		return ['error.nonpositive'];
	return ['positive'];
}

describe('A Validator', () => {
	it('ritorna error.nonpositive per numeri non strettamente positivi', () => {
		assert.deepEqual(validator(-1), ['error.nonpositive']);
	})
});