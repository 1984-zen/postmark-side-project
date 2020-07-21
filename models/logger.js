var fs = require("fs");
var infoStream = fs.createWriteStream(__dirname + "/logs/info.txt");
var errorStream = fs.createWriteStream(__dirname + "/logs/error.txt");
var debugStream = fs.createWriteStream(__dirname + "/logs/debug.txt");

function err(msg) {
    console.log('err logger from /models/logger.js: ', msg)
    let message = new Date().toISOString() + " : " + msg + "\n";
    errorStream.write(message);
}
function info(msg) {
    console.log('info logger from /models/logger.js: ', msg)
    let message = new Date().toISOString() + " : " + msg + "\n";
    infoStream.write(message);
}
function debug(msg) {
    console.log('debub logger from /models/logger.js: ', msg)
    let message = new Date().toISOString() + " : " + msg + "\n";
    debugStream.write(message);
}

module.exports = { err, debug, info }