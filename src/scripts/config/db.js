const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5437,
  user: 'vadim',
  password: '1111',
  database: 'DB_lab6'
});

module.exports = pool;
