const e = require("express");
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

router.get("/", verifyToken, async (req, res) => {
  jwt.verify(req.token, "adminkey", async (err, authData) => {
    if (err) {
      res.send("Token error");
    } else {
      const names = await db.query("SELECT regnumber FROM students");
      res.send(names.rows[0]);
    }
  });
});

router.get("/:id", verifyToken, async (req, res) => {
  jwt.verify(req.token, "adminkey", async (err, authData) => {
    if (err) {
      res.send("Token error");
    } else {
      const id = req.params.id;
      const response = await db.query(
        "SELECT s.id,s.company_id,s.role_off,s.ctc_off,s.cgpa,s.date_alloted,c.company_name,c.mail_id FROM schedule s,company c  WHERE s.company_id=$1 AND s.company_id=c.id",
        [id]
      );
      res.send(response.rows);
    }
  });
});

router.get("/student/:id", verifyToken, async (req, res) => {
  jwt.verify(req.token, "adminkey", async (err, authData) => {
    if (err) {
      res.send("Token error");
    } else {
      const cgpa = req.params.id;
      const response = await db.query(
        "SELECT * FROM students s,department d where s.cgpa >= $1 AND s.dept_id=d.id",
        [cgpa]
      );
      res.send(response.rows);
    }
  });
});

module.exports = router;
