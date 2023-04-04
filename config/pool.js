const { Pool } = require("pg");
require("dotenv").config({ path: "./.env" });

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  puertodb: process.env.PORTDB,
  allowExitOnIdle: true,
});

module.exports = pool