//Title:  Assignment 7.2 NodeShopper
//Author: Lucas Hoffman
//Date: December 5, 2021
//Description: Course work for assignment 7.2


//require statement for mongoose and assign it to a variable named mongoose

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create lineItemSchema
let lineItemSchema = new Schema ({ 
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
})

//create invoice Schema
let invoiceSchema = new Schema ({ 
    subtotal: { type: Number },
    tax: { type: Number },
    dateCreated: { type: String },
    dateShipped: { type: String },
    lineItems: [lineItemSchema],
})

//create customerSchema
let customerSchema = new Schema({ 
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    invoices: [invoiceSchema],
})

//Export model using module.exports
module.exports = mongoose.model('Customer', customerSchema);
