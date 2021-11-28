/*
============================================
; Title: Hoffman-session-routes.js
; Date: November 28, 2021
; Description: User API for week 6
===========================================
*/

// Required Statements
const express = require("express");

const router = express.Router();

const User = require("../models/hoffman-user");

const bcrypt = require("bcrypt");

const saltRounds = 10;

/**
 * @openapi
 * /api/signup:
 *   post:
 *     summary: Creates a new user object
 *     description: Creates a new user object.
 *     tags: [user]
 *     requestBody:
 *       description:
 *         User's Information
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               userName:
 *                 type: "string"
 *               Password:
 *                 type: "string"
 *               emailAddress:
 *                 type: "string"
 *     responses:
 *       200:
 *         description: Registered User
 *       401:
 *         description: Username is already in use
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */

router.post("/signup", (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, function (error, user) {
      if (error) res.status(501).send("MongoDB Exception");
      if (!user) {
        let hashedPassword = bcrypt.hashSync(req.body.Password, saltRounds);
        const newRegisteredUser = {
          userName: req.body.userName,
          Password: hashedPassword,
          emailAddress: req.body.emailAddress,
        };
        User.create(newRegisteredUser, (error, user) => {
          if (error) res.status(501).send("MongoDB Exception");
          res.send(user);
        });
      }
      if (user) res.status(401).send("Username is already being used");
    });
  } catch (error) {
    res.status(500).send("Server Exception");
  }
});

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Logs the user in.
 *     description: Logs the user in.
 *     tags: [user]
 *     requestBody:
 *       description:
 *         User's Information
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               userName:
 *                 type: "string"
 *               Password:
 *                 type: "string"
 *     responses:
 *       200:
 *         description: User logged in
 *       401:
 *         description: Invalid username and/or password
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */

router.post("/login", (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, function (error, user) {
      if (error) res.status(501).send("MongoDB Exception");
      if (user) {
        let passwordIsValid = bcrypt.compareSync(req.body.Password, user.Password);
        if (passwordIsValid) {
          res.status(200).send("User logged in successfully");
        } else {
          res.status(401).send("Invalid username and/or password");
        }
      }
      if (!user) res.status(401).send("Invalid username and/or password");
    });
  } catch (error) {
    res.status(500).send("Server Exception");
  }
});

module.exports = router;
