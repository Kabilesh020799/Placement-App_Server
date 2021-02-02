const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const login = require("./routes/login");
const Form = require("./routes/Form");
const adminForm = require("./routes/adminForm");
const scheduleFilter = require("./routes/scheduleFilter");
const admin = require("./routes/admin");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/login", login);

app.use("/api/form", Form);

app.use("/api/adminform", adminForm);

app.use("/api/profile", scheduleFilter);

app.use("/api/admin", admin);

app.listen(5000, () => {
  console.log("Server Started");
});
