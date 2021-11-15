/*
============================================
; Title: composer.js
; Author: Lucas Hoffman
; Date: November 13, 2021
; Description: Assignment 4.2
===========================================
*/

// Require Statement for Mongoose
const mongoose = require("mongoose");

// Variable Schema
const Schema = mongoose.Schema;

// Declaring composerSchema
const composerSchema = new Schema({
  firstName: String,
  lastName: String,
});

// Create Composer - assign mongoose.Schema object
const Composer = mongoose.model("Composer", composerSchema);

// Export Composer model
module.exports = Composer;
