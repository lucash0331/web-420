/*
============================================
; Title: hoffman-capstone.js
; Author: Lucas Hoffman
; Date: December 19, 2021
; Description: Team API for capstone project
===========================================
*/

// Require Statements for mongoose
const mongoose = require("mongoose");

// Declaring Schema variable 
const Schema = mongoose.Schema;

// Declaring playerSchema
const playerSchema = new Schema({
  firstName: String,
  lastName: String,
  salary: Number,
});

// Declaring teamSchema
const teamSchema = new Schema({
  name: String,
  mascot: String,
  players: [playerSchema],
});

//Create Team variable and assign it to mongoose model
const Team = mongoose.model("Team", teamSchema);

// Export Team
module.exports = Team;
