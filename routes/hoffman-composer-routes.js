/*
============================================
; Title: Hoffman-composer-routes.js
; Author: Lucas Hoffman
; Date: November 13, 2021
; Description: Assignment 4.2
;===========================================
*/

// Requirements
const express = require("express");
var http = require("http");

// Router variable
const router = express.Router();

const Composer = require("../models/hoffman-composer");

//Connect to MongoDB
var mongoDB = "mongodb+srv://web420_user:p455w0rd@buwebdev-cluster-1.umga8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {});

/**
 * @openapi
 * /api/composers:
 *   get:
 *     description: Find all composers.
 *     responses:
 *       200:
 *         description: Array of composer documents
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */

router.get("/composers", (req, res) => {
  try {
    Composer.find({}, function (error, composers) {
      if (error) res.status(501).send("MongoDB exception");
      res.send(composers);
    });
  } catch (error) {
    res.status(500).send("server exception");
  }
});

/**
 * @openapi
 * /api/composers:
 *   post:
 *     summary: Creates a new composer object
 *     description: Creates a new composer object,
 *     requestBody:
 *       description:
 *         Composer's Information
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               firstName:
 *                 type: "string"
 *               lastName:
 *                 type: "string"
 *     responses:
 *       200:
 *         description: Composer document
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */

router.post("/composers", (req, res) => {
  try {
    Composer.create(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
      (error, composer) => {
        if (error) res.status(501).send("MongoDB exception");
        res.send(composer);
      }
    );
  } catch (error) {
    res.status(500).send("server exception");
  }
});

/**
 * @openapi
 * /api/composers/{id}:
 *   get:
 *     summary: returns a composer document
 *     description: API for returning a single composer object from MongoDB.
 *     parameters:
 *       - in: path
 *         name: id
 *         description:
 *           the composer id requested by the user
 *         required: true
 *         schema:
 *           type: string
 *           description: the composer id requested by the user
 *     responses:
 *       200:
 *         description: Composer document
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */

router.get("/composers/:id", (req, res) => {
  try {
    const id = req.params.id;
    Composer.findOne({ _id: id }, function (error, composers) {
      if (error) res.status(501).send("MongoDB exception");
      res.send(composers);
    });
  } catch (error) {
    res.status(500).send("server exception");
  }
});

module.exports = router;
