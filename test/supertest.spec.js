/*'use strict';

let 	assert = require('chai').assert
let		chai = require('chai');
let 	chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../app');
let expect = chai.expect;

chai.use(chaiHttp);

let foo = "Hello";

describe('A Chai Validator', () => {
	it('should be a string', () => {
		assert.typeOf(foo, 'string'); 
	});
});


describe('Test CHAI-HTTP group', function() {
    it('/pippo expect 404  : ', function (done) {
        chai.request(server)
            .get('/pippo')
            .end(function (err, res) {
                expect(res).to.have.status(404);
                done();
            })
    });
    it('/ expect 200  : ', function (done) {
        chai.request(server)
            .get('/')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            })
    });
    it('body test  : ', function (done) {
        chai.request(server)
            .get('/pippo')
            .end(function (err, res) {
            	 	res.should.have.status(404);
                done();
            })
    });

});

*/
