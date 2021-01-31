const express = require("express");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const router = express.Router();

const db = require("./../db");

router.post(
  "/",
  [
    body("id").not().isEmpty().isLength({ min: 9 }),
    body("password").not().isEmpty().isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        const User = await db.query("SELECT * from credentials WHERE id=$1", [
          req.body.id,
        ]);
        const Id = User.rows[0].id;
        const password = User.rows[0].pass;
        if (password === req.body.password) {
          jwt.sign({ user: User.rows[0] }, "secretkey", (err, token) => {
            res.json({ token: token, msg: "Login Successfull" });
          });
        } else {
          res.send("Please Enter Proper Credentials");
        }
      } else {
        res.send({ error: "Bad request,please check credentials" });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

router.post(
  "/admin",
  [
    body("id").not().isEmpty().isLength({ min: 4 }),
    body("password").not().isEmpty().isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      console.log(req.body);
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        const User = await db.query(
          "SELECT * from admincredentials WHERE id=$1",
          [req.body.id]
        );
        console.log(User);
        const Id = User.rows[0].id;
        const password = User.rows[0].pass;
        if (password === req.body.password) {
          jwt.sign({ user: User.rows[0] }, "secretkey", (err, token) => {
            res.json({ token: token, msg: "Login Successfull" });
          });
        } else {
          res.send("Please Enter Proper Credentials");
        }
      } else {
        res.send({ error: "Bad request,please check credentials" });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
