# nativescript-firebase

This is a Nativescript-compatible wrapper for the Firebase node.js SDK. 

## License

This module is licensed under the MIT license. Firebase and other modules have different licenses.

## Installation 

    tns plugin add nativescript-firebase 

## Usage

Exactly the same as Firebase for node.js:
```Javascript
var Firebase = require("nativescript-firebase");

var fb = new Firebase("some-app.firebaseio.com");
```

This module uses the actual Firebase node.js SDK (see package.json dependencies).

## How it works

This module provides some dependencies required by the Firebase node.js SDK in the form of bundled modules. Versions 0.0.1 and 0.0.2 used a modified `require` function but I changed this because around version 1.5.0 of Nativescript it seems they replaced the global `require` with a parameter supplied to each module, meaning it couldn't be overwritten. 

The bundled modules are mostly just wrappers around other modules, or internal Nativescript functionality. They are:
 - `_stream_duplex` (uses `readable-stream`)
 - `_stream_readable` (uses `readable-stream`)
 - `_stream_writable` (uses `readable-stream`)
 - `emitter` (uses `tiny-emitter` which is Nativescript compatible)
 - `faye-websocket` (uses `nativescript-websockets` - see below)
 - `https` (uses `https-browserify` which in turn uses Nativescript's `XMLHttpRequest`)
 - `inherits` (uses `inherits-browser.js`)

I've set the version number of the `faye-websocket` and `inherits` wrappers to 999.9.9 to override the modules in deeper dependencies.
 
The following modules are also used, and are Nativescript-compatible out of the box:
 - `buffer`
 - `events`
 - `util` (requires custom `inherits`)

The following global variables are also created to make the modified modules and Firebase work:
 - `process` with `version`, `nextTick`, `platform` and `env`
 - `window` with `XMLHttpRequest`
 - `buffer` using the `buffer` module
 
This is made possible by a [modified version](https://github.com/lyonzy/nativescript-websockets) of NathanaelA's [nativescript-websockets](https://github.com/NathanaelA/nativescript-websockets) module, with a workaround for [an SSL issue](https://github.com/NathanaelA/nativescript-websockets/issues/5). This module is the substitute for the `faye-websocket` module required by Firebase.

## Limitations and warnings

This module hasn't been rigorously tested. Here's what's working for me:
 - Logging in with a master key
 - Logging in with an OAuth token (requires the `https` module)
 - Retrieving some data with `once()` and `on()`
 - Setting data with `push()`

Most features should be working, but there might be more bugfixes to come. I'm using this in a project of mine so it'll get further tested as I use it more.

Note that this might have problems with Nativescript 1.5.1 due to [this issue](https://github.com/NativeScript/android-runtime/issues/316). 