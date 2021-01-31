const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Kabilhrock@27",
  host: "localhost",
  port: 5432,
  database: "credentials",
});

module.exports = pool;
