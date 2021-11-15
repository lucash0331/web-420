/*
Title: App.js
Author: Lucas Hoffman
Date: 10/22/2021
Description: App.js file for assignment 1.3
*/

// Requirement statements
var express = require("express");
var http = require("http");
var swaggerUIExpress = require("swagger-ui-express");
var swaggerJSDoc = require("swagger-jsdoc");
var mongoose = require("mongoose");

//Assigning Variable App to express library
var app = express();

//Setting the port to 3000
app.set("port", process.env.PORT || 3000);

//Set the app to use express.json
app.use(express.json());

//Set the app to use express.urlencoded
app.use(express.urlencoded({ extended: true }));

//Connect to MongoDB
var mongoDB = "mongodb+srv://web420_user:p455w0rd@buwebdev-cluster-1.umga8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", function () {
  console.log("Application connected to MongoDB instance");
});

//Defining object named options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WEB 420 RESTful APIs",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], //files containing annotations for openAPI specifications.
};

// Declaring openAPISpecification variable
const openAPISpecification = swaggerJSDoc(options);

//Declaring swaggerSpec variable
app.use("/api-docs", swaggerUIExpress.serve, swaggerUIExpress.setup(openAPISpecification));

//Create server and listen on port 3000.
http.createServer(app).listen(app.get("port"), function () {
  console.log("Application started and listening on port %s", +app.get("port"));
});
               
