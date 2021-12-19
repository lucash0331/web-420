/*
============================================
; Title: hoffman-casptone-routes.js
; Author: Lucas Hoffman
; Date: December 19, 2021
; Description: Team API for capstone project
===========================================
*/

// Requirement statements
const express = require("express");

const router = express.Router();

const Team = require("../models/hoffman-capstone.js");

/**
 * @openapi
 * /api/teams:
 *   get:
 *     description: Find all teams
 *     tags: [team]
 *     responses:
 *       200:
 *         description: Array of team documents
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */
router.get("/teams", (req, res) => {
  try {
    Team.find({}, function (error, teams) {
      if (error) res.status(501).send("MongoDB exception");
      res.send(teams);
    });
  } catch (error) {
    res.status(500).send("server exception");
  }
});

/**
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     summary: Assigns a player to a team
 *     description: Assigns a player to a team
 *     tags: [team]
 *     parameters:
 *       - in: path
 *         name: id
 *         description:
 *           the id of the team to add the player to
 *         required: true
 *         schema:
 *           type: string
 *           description: the id of the team to add the player to
 *     requestBody:
 *       description:
 *         players Information
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               firstName:
 *                 type: "string"
 *               lastName:
 *                 type: "string"
 *               salary:
 *                 type: "number"
 *     responses:
 *       200:
 *         description: Player added to MongoDB
 *       401:
 *         description: Invalid teamID
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */

router.post("/teams/:id/players", (req, res) => {
  try {
    Team.findOne({ _id: req.params.id }, (error, team) => {
      if (error) res.status(501).send("MongoDB exception");
      if (team) {
        const newPlayer = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          salary: req.body.salary,
        };
        team.players.push(newPlayer);
        team.save((error, team) => {
          if (error) res.status(501).send("MongoDB exception");
          res.send(team.players.slice(-1)[0]);
        });
      } else {
        res.status(401).send("Invalid teamID");
      }
    });
  } catch (error) {
    res.status(500).send("server exception");
  }
});

/**
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     summary: find all players on a team
 *     description: find all players on a team
 *     tags: [team]
 *     parameters:
 *       - in: path
 *         name: id
 *         description:
 *           the id of the team to get all its players
 *         required: true
 *         schema:
 *           type: string
 *           description:  the id of the team to get all its players
 *     responses:
 *       200:
 *         description: Array of player documents
 *       401:
 *         description: Invalid teamID
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */

router.get("/teams/:id/players", (req, res) => {
  try {
    Team.findOne({ _id: req.params.id }, (error, team) => {
      if (error) {
        console.log(error);
        res.status(501).send("MongoDB exception");
      }
      if (team) {
        res.json(team.players);
      } else {
        res.status(401).send("Invalid teamID");
      }
    });
  } catch (error) {
    res.status(500).send("server exception");
  }
});

/**
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     summary: Delete team object
 *     description: Delete team object
 *     tags: [team]
 *     parameters:
 *       - in: path
 *         name: id
 *         description:
 *           the team id requested by user
 *         required: true
 *     responses:
 *       200:
 *         description: Array of team documents
 *       401:
 *         description: Invalid teamID
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */
router.delete("/teams/:id", (req, res) => {
  try {
    const id = req.params.id;
    Team.findByIdAndDelete({ _id: id }, function (error, team) {
      if (error) res.status(501).send("MongoDB exception");
      if (team) {
        res.send(team);
      } else {
        res.status(401).send("Invalid teamID");
      }
    });
  } catch (error) {
    res.status(500).send("server exception");
  }
});

/**
 * @openapi
 * /api/teams:
 *   post:
 *     summary: Create a new team object
 *     description: Creates a new team object
 *     tags: [team]
 *     requestBody:
 *       description:
 *         Team's Information
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               name:
 *                 type: "string"
 *               mascot:
 *                 type: "string"
 *     responses:
 *       200:
 *         description: Team added to MongoDB
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */
router.post("/teams", (req, res) => {
  try {
    const newTeam = {
      name: req.body.name,
      mascot: req.body.mascot,
    };
    Team.create(
      newTeam,

      (error, team) => {
        if (error) res.status(501).send("MongoDB exception");
        res.send(team);
      }
    );
  } catch (error) {
    res.status(500).send("server exception");
  }
});

// Export router
module.exports = router;
