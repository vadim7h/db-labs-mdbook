const pool = require('../config/db');

module.exports = {
  async getAllUsers() {
    const res = await pool.query('SELECT * FROM "User"');
    return res.rows;
  },

  async getUserById(id) {
    const res = await pool.query('SELECT * FROM "User" WHERE id = $1', [id]);
    return res.rows[0];
  },

  async createUser({ nickname, email, password, photo }) {
    const res = await pool.query(
      'INSERT INTO "User" (nickname, email, password, photo) VALUES ($1, $2, $3, $4) RETURNING *',
      [nickname, email, password, photo]
    );
    return res.rows[0];
  },

  async deleteUser(id) {
    await pool.query('DELETE FROM "User" WHERE id = $1', [id]);
  }
};
