'use strict';

var transformTools = require('browserify-transform-tools');

module.exports = transformTools.makeRequireTransform('browserify-global-shim',
	{
		evaluateArguments: true,
		jsFilesOnly: true
	},
	function(args, opts, cb) {
		var shimmedModules = opts.config || {};

		var moduleName = args[0];
		var shim = shimmedModules[moduleName];

		if(typeof shim === 'undefined') {
			return cb();
		}
		else {
			return cb(null, '(window.' + shim + ')');
		}
	}
);
