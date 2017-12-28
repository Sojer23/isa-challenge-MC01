'use strict';

/*
 * Dependecies
 */
var express = require('express');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var app = express();

//To set the API routes
var routes = require('./src/routes.js');
//To set the configurations to run the API
var config = require('./src/configurations/config.js');
//To set the API documentation
var swaggerUtils = require('./src/utils/swagger');

//
app.use(helmet());
//
app.use(bodyParser());
//Route to use the interface content
app.use('/', express.static(__dirname + '/public'));

app.use('/api', routes);

//Get the environment
var env = process.env.NODE_ENV? process.env.NODE_ENV : "development";

//It is to get the server and database params if is for development or testing
config.addConfiguration('config.yaml', env, 'utf8');

//list of swagger documents, one for each version of the api.
var swaggerDocs = [
    swaggerUtils.getSwaggerDoc(1)
];

//initialize swagger middleware for each swagger documents.
swaggerUtils.initializeMiddleware(app, swaggerDocs, function () {

    //We can introduce serverPort environmet variable or in file config.yaml
    var serverPort = process.env.PORT || config.server.port;
    if (serverPort) {
        app.listen(serverPort, () => {
            console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
            console.log("API has been initialized in "+env+" environment.");
        });
    }else{
        console.log("You must set a PORT.")
    }

});


