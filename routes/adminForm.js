const express = require("express");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const router = express.Router();

const db = require("./../db");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader != "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.send("Forbidden");
  }
};

router.post(
  "/",
  verifyToken,
  [
    body("name").not().isEmpty(),
    body("id").not().isEmpty(),
    body("email").not().isEmpty(),
    body("role").not().isEmpty(),
    body("cgpa").not().isEmpty(),
    body("ctc").not().isEmpty(),
    body("date").not().isEmpty(),
  ],
  async (req, res) => {
    jwt.verify(req.token, "adminkey", async (err, authData) => {
      if (err) {
        res.send({
          error: "Request Forbidden",
        });
      } else {
        try {
          console.log(req.body);
          const id = req.body.id;
          const role_off = req.body.role;
          const ctc_off = parseFloat(req.body.ctc);
          const req_cgpa = parseInt(req.body.cgpa);
          const date_alotted = req.body.date;
          const company_id = req.body.company_id;
          const result1 = await db.query(
            "INSERT INTO schedule (id,role_off,ctc_off,cgpa,company_id,date_alloted) values ($1,$2,$3,$4,$5,$6)",
            [id, role_off, ctc_off, req_cgpa, company_id, date_alotted]
          );
          //console.log(result);
          res.send(result1);
        } catch (err) {
          console.log(err);
          res.send(err);
        }
      }
    });
  }
);

router.put(
  "/",
  [
    body("companyName").not().isEmpty(),
    body("role").not().isEmpty(),
    body("cgpa").not().isEmpty(),
    body("ctc").not().isEmpty(),
    body("isPlaced").not().isEmpty(),
    body("date").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      console.log(req.body);
      const company_name = req.body.companyName;
      const role_off = req.body.role;
      const ctc_off = req.body.ctc;
      const req_cgpa = parseFloat(req.body.cgpa);
      const placed_stu = req.body.isPlaced;
      const date_alotted = req.body.date;
      const result = await db.query(
        "UPDATE schedule SET role_off=$1,ctc_off=$2,req_cgpa=$3,placed_stu=$4,date_alotted=$5 WHERE company_name=$6",
        [role_off, ctc_off, req_cgpa, placed_stu, date_alotted, company_name]
      );
      console.log(result);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
);

module.exports = router;
