var expect = require('expect');
var assert = require('assert');

describe('A First Note Test', () => {
	it('should properly run test 1', () =>{
		expect(1).toBe(1);
	});

	it('should fail run test 2', () =>{
		assert(sayHello(),'Hello');
	});
});


function sayHello(){
	return 'Hello';
}



/*it('should properly run test 2', () =>{
	http.get(prepareRequestOptions('/asd'), function(res){
		var buf = '';
console.log(res);
		if (res.statusCode != 200) {
			throw "Request to '" + path + "' failed with status: " + res.statusCode;
		} else {
			console.log(res);
		}

		res.on('data', function(chunk) {
			buf += chunk; });
		res.on('end', function() { callback(buf); });
	}).on('error', function(e) {
		throw e.message;
	});
});

function prepareRequestOptions(path, method) {
	var options = {
		host: 'localhost',
		port: '3000',
		path: path,
		headers: {
			'cookie': ''
		}
	};
	if (method) {
		options.method = method;
	}
	return options;
}*/