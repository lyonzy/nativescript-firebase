# nativescript-firebase

This is a Nativescript-compatible wrapper for the Firebase node.js SDK. 

## License

This module is licensed under the MIT license. Firebase and other modules have different licenses.

## Installation 

    tns plugin add git+https://github.com/lyonzy/nativescript-firebase.git  

## Usage

Exactly the same as Firebase for node.js:
```Javascript
var Firebase = require("nativescript-firebase");

var fb = new Firebase("some-app.firebaseio.com");
```

This module uses the actual Firebase node.js SDK (see package.json dependencies).

## How it works

This module uses a similar method to (Mockery)[https://github.com/mfncooper/mockery] to substitute modules at runtime, and provide appropriate modules when the Firebase SDK require()s them. The easiest way to figure it out is to look at the code, but essentially it overwrites the global.require() function with one that makes the appropriate substitutions before calling the original. It restores the original after require()-ing Firebase though so your other require() calls should be fine.

The substitutions made can be seen in the code.

It also creates a few global variables for node.js features that aren't in Nativescript, specifically `process` and `Buffer` (using the (buffer)[https://www.npmjs.com/package/buffer] browser module). 

This is made possible by a (modified version)[https://github.com/lyonzy/nativescript-websockets] of NathanaelA's (nativescript-websockets)[https://github.com/NathanaelA/nativescript-websockets] module, with a workaround for (an SSL issue)[https://github.com/NathanaelA/nativescript-websockets/issues/5]. This module is the substitute for the `faye-websocket` module required by Firebase.

## Limitations and warnings

This module is mostly untested. Here's what's working:
 - Logging in with a master key
 - Retrieving some data with `once()`

Most features should be working, but there might be more bugfixes to come. I'm using this in a project of mine so it'll get further tested as I use it more.