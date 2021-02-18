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
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      res.send("Token error");
    } else {
      const names = await db.query("SELECT regnumber FROM students");
      res.send(names.rows);
    }
  });
});

router.get("/:id", verifyToken, async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      res.send("Token error");
    } else {
      const { id } = req.params;
      const details = await db.query(
        "SELECT * FROM students where regnumber = $1",
        [id]
      );
      res.send(details.rows[0]);
    }
  });
});
router.get("/:id/company", verifyToken, async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      res.send("Token error");
    } else {
      const { id } = req.params;
      const details = await db.query(
        "SELECT * FROM students where regnumber = $1",
        [id]
      );
      const schedules = await db.query(
        "SELECT s.id,s.ctc_off,s.date_alloted,s.role_off,s.company_id,c.company_name,c.mail_id FROM schedule s,company c WHERE c.id = s.company_id AND s.cgpa < $1",
        [details.rows[0].cgpa]
      );
      res.send(schedules.rows);
    }
  });
});

module.exports = router;
