'use strict';

var assert = require('assert')
	, path = require('path')
	, globalShim = require('../')
	, transformTools = require('browserify-transform-tools')
	;

describe('global-shim', function () {
	var testFile = path.resolve(__dirname, './testInput.js');

	it('should pass everything through if unconfigured', function () {
		transformTools.runTransform(globalShim, testFile, function(err, transformed) {
			assert(!err, "Error: " + err);
			assert.equal("var $ = require('jQuery'), foo = require('a' + 'Module'), bar = require('another' + 'Module');\n$(foo, bar);\n", transformed);
		});
	});

	it('should replace all configured modules', function () {
		var config = {
			'aModule': 'globalModule',
			'jQuery': '$'
		};

		transformTools.runTransform(globalShim.configure(config), testFile, config, function(err, transformed) {
			assert(!err, "Error: " + err);
			assert.equal("var $ = (window.$), foo = (window.globalModule), bar = require('another' + 'Module');\n$(foo, bar);\n", transformed);
		});
	});
});