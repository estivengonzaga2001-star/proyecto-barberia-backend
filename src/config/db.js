const { Pool } = require("pg");

const pool = new Pool({
  host: "w7iepq.h.filess.io",
  port: 61008,
  database: "barberia_db_senttentdo",
  user: "barberia_db_senttentdo",
  password: "8229f09f6ff758344e4deadd20f78c75814c85e4"
});

module.exports = pool;