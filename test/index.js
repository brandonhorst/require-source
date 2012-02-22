var mocha = require('mocha');
var should = require('should');
var requireSource = require('../index').require;

describe('when js source code is given', function() {
	var sourceCode = 'module.exports = "hello"';
	var invalidSourceCode = 'this is not a valid javascript source code';


	it('it should be executed properly and set the exports object', function() {
		var helloModule = requireSource(sourceCode);
		helloModule.should.equal('hello');
	});

	it('it should raise an error when invalid source code is given', function() {
		(function(){
  			var invalidModule = requireSource(invalidSourceCode);
		}).should.throw();
	});


})


describe('when a function enclosing a module code is given', function() {
	var moduleCode = function() {
		var util = require('util');
		module.exports = function(obj) {
			return util.inspect(obj);
		}
	} 

	it('it should be executed properly and set the exports object', function() {
		var inspectModule = requireSource(moduleCode);
		inspectModule.should.be.a('function');
		inspectModule(function() {}).should.equal('[Function]');
	});

})