const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5433,
  user: 'sonik',
  password: '1234',
  database: 'DB_lab6'
});

module.exports = pool;
