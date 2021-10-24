/*
Title: web-340
Author: Lucas Hoffman
Date: 10/22/2021
Description: App.js file for assignment 1.3
*/

// jslint node: true 
"use strict";

// Require statements
const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const mongoose = require('mongoose');
const logger = require('morgan');

// Assign var app to express library
const app = express();

// Set port
app.set('port', process.env.PORT || 3000);

// Parses JSON request objects
app.use(express.json());

// Parses incoming requests
app.use(express.urlencoded({'extended': true}));

// Morgan logger
app.use(logger("short"));

// Create an object literal.
const options = {definition: {openApi: '3.0.0', info: {title: 'WEB 420 RESTful APIs', version: '1.0.0'}},
        apis: ['./routes*.js']};

        const openApiSpecification = swaggerJSDoc(options); // Creates new openApiSpec variable that calls the swaggerJsdoc library with the options literal.

        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpecification)); // openApiSpecification variable is wired to the app variable.
        
        http.createServer(app).listen(app.get('port'), function () {
            console.log('Application started on port ' + app.get('port')); // Starts the server listening on port 3000 using ('port') variable.
        });
               