# browserify-global-shim

A [browserify](http://browserify.org) [transform](https://github.com/substack/node-browserify#btransformopts-tr) for replacing modules with global variables.

Are you using browserify to convert a module that depends on [lo-dash](http://lodash.com), [jQuery](http://jquery.com), [q](http://documentup.com/kriskowal/q/) or some other omnipresent library? And you don't want to include this dependency in your browserify-build because it's already part of your web app? Use **browserify-global-shim** to replace `require('some module')` with references to a global variable.

## Getting Started
Install the module with: `npm install --save-dev browserify-global-shim`

Configure it via `package.json`:

```
{
    "name": "myProject",
    "version": "1.0.0",
    ...
	"browserify": {
		"transform": [
			"browserify-global-shim"
		]
	},
    "browserify-global-shim": {
    	"jQuery": "$"
    },
    ...
}
```

or by using the [browserify API](https://github.com/substack/node-browserify#api-example):

```
var browserify = require('browserify');
var b = browserify();
...
var globalShim = require('browserify-global-shim').configure({
	'jQuery': '$'
});
b.transform(globalShim);
...
```

In both cases all references to `require('jQuery')` will be replaced with `window.$` when you run browserify.

## Similar libraries

What are you saying? The `global:...` option of [*browserify-shim*](https://github.com/thlorenz/browserify-shim) does just the same? That's true!

And *browserify-shim* is also  configurable via an API? Also true!

But unfortunately you can't have both at the same time. The API is only supported in the old 2.x versions, the `global:...` option became available in 3.x. If you need both, you're in a tough spot.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


## License
Copyright (c) 2014 Raphael Luba. Licensed under the MIT license.
