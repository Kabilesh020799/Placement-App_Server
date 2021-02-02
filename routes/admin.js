const express = require("express");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const router = express.Router();

const db = require("./../db");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  console.log(bearerHeader);
  if (typeof bearerHeader != "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.send("Forbidden");
  }
};

router.get("/", verifyToken, [body("id").not().isEmpty()], async (req, res) => {
  jwt.verify(req.token, "adminkey", async (err, authData) => {
    if (err) {
      res.send("Token error");
    } else {
      const names = await db.query("SELECT regnumber FROM students");
      res.send(names.rows[0]);
    }
  });
});

module.exports = router;
