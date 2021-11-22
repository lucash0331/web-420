/*
============================================
; Title: hoffman-person-routes.js
; Author: Professor Krasso
; Date: November 21, 2021
; Modified By: Lucas Hoffman
; Description: Person API Routes
===========================================
*/

// Require Statements
const express = require("express");

const router = express.Router();

const Person = require("../models/hoffman-person");

/**
 * @openapi
 * /api/persons:
 *   get:
 *     description: Find all persons.
 *     tags: [person]
 *     responses:
 *       200:
 *         description: Array of person documents
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */
router.get("/persons", (req, res) => {
  try {
    Person.find({}, function (error, persons) {
      if (error) res.status(501).send("MongoDB exception");
      res.send(persons);
    });
  } catch (error) {
    res.status(500).send("server exception");
  }
});

/**
 * @openapi
 * /api/persons:
 *   post:
 *     summary: Creates a new person object
 *     description: Creates a new person object
 *     tags: [person]
 *     requestBody:
 *       description:
 *         Person's Information
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               firstName:
 *                 type: "string"
 *               lastName:
 *                 type: "string"
 *               roles:
 *                 type: "array"
 *                 items:
 *                   type: "object"
 *                   properties:
 *                     text:
 *                       type: "string"
 *               birthDate:
 *                 type: "string"
 *               dependents:
 *                 type: "array"
 *                 items:
 *                   type: "object"
 *                   properties:
 *                     firstName:
 *                       type: "string"
 *                     lastName:
 *                       type: "string"
 *     responses:
 *       200:
 *         description: Array of Person Documents
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */
router.post("/persons", (req, res) => {
  try {
    Person.create(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        roles: req.body.roles,
        dependents: req.body.dependents,
        birthDate: req.body.birthDate,
      },
      (error, person) => {
        if (error) res.status(501).send("MongoDB exception");
        res.send(person);
      }
    );
  } catch (error) {
    res.status(500).send("server exception");
  }
});

// Export router
module.exports = router;