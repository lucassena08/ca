// changes in this file are ignored to avoid exposing sensitive data
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "lassraro123",
  port: 5432,
});

module.exports = pool;
