/*
============================================
; Title: Hoffman-person.js
; Author: Professor Krasso
; Date: November 21, 2021
; Modified By: Lucas Hoffman
; Description: hoffman-Person API
===========================================
*/

// Require Statement
const mongoose = require("mongoose");

// Declaring Schema variable and assign to mongoose.Schema object
const Schema = mongoose.Schema;

// Declaring roleSchema variable
const roleSchema = new Schema({
  text: String,
});

// Declaring dependentSchema variable
const dependentSchema = new Schema({
  firstName: String,
  lastName: String,
});

// Declaring personSchema variable
const personSchema = new Schema({
  firstName: String,
  lastName: String,
  roles: [roleSchema],
  dependents: [dependentSchema],
  birthDate: String,
});

// Create Person and assign to mongoose model
const Person = mongoose.model("Person", personSchema);

// Export Person
module.exports = Person;