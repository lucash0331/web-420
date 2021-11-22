
/*
Title: App.js
Author: Lucas Hoffman
Date: 10/22/2021
Description: App.js file for Web 420
*/

// Requirement statements
var express = require("express");
var http = require("http");
var swaggerUIExpress = require("swagger-ui-express");
var swaggerJSDoc = require("swagger-jsdoc");
var mongoose = require("mongoose");
var composerAPI = require("./routes/hoffman-composer-routes");
var personRoutes = require("./routes/hoffman-person-routes");

//Assigning Variable App to express library
var app = express();

//Setting the port to 3000
app.set("port", process.env.PORT || 3000);

//Set the app to use express.json
app.use(express.json());

//Set the app to use express.urlencoded
app.use(express.urlencoded({ extended: true }));

//Connect to MongoDB
const conn = "mongodb+srv://web420_user:p455w0rd@buwebdev-cluster-1.umga8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(conn, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`Application connected to MongoDB instance`);
  })
  .catch((err) => {
    console.log(`MongoDB Error: ${err.message}`);
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
               