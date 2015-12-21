var ws = require("nativescript-websockets");
global.Buffer = require("buffer/index.js").Buffer;
global.window = { XMLHttpRequest: XMLHttpRequest }

global.process = {
    nextTick: function (cb) { setTimeout(cb, 0); },
    platform: "Nativescript",
    version: "v0.10.22",
    env: {}
}

var firebase = require("firebase");

module.exports = firebase;