'use strict';


/**
 * Module dependecies.
 * */

var jsyaml = require('js-yaml');
var fs = require('fs');
var path = require('path');


var config = {
    addConfiguration: _addConfiguration
};

module.exports = config;

/*
 * Implement the functions
 */
function _addConfiguration(uri, env, encoding) {
    var configString = null;

    if (!uri) {
        throw new Error("Parameter URI is required");
    } else {
        configString = fs.readFileSync(path.join(__dirname, uri), encoding);
    }

    var newConfigurations = jsyaml.safeLoad(configString)[process.env.NODE_ENV ? process.env.NODE_ENV : env];

    for (var c in newConfigurations) {
        this[c] = newConfigurations[c];
    }
    return newConfigurations;
}