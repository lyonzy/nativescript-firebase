var ws = require("nativescript-websockets");
global.Buffer = require("buffer").Buffer;

var substituteModules = {
	"_stream_writable": "readable-stream/lib/_stream_writable",
	"_stream_duplex": "readable-stream/lib/_stream_duplex",
	"_stream_readable": "readable-stream/lib/_stream_readable",
	"inherits": "inherits/inherits_browser",
	"faye-websocket": {Client: WebSocket}
}

function hookRequire() {
	global.originalRequire = global.require;
	global.require = function(moduleName, path) {
		var subst = substituteModules[moduleName];
		if (typeof subst == "string") {
			return global.originalRequire(subst, path);
		} else if (typeof subst == "object") {
			return subst;
		} else {
			return global.originalRequire(moduleName, path);
		}
	}
}

function unhookRequire() {
	global.require = global.originalRequire;
}

global.process = {
    nextTick: require("next-tick"),
    platform: "Nativescript",
    version: "v0.10.22",
    env: {}
}

hookRequire();
var firebase = require("firebase");
unhookRequire();

module.exports = firebase;