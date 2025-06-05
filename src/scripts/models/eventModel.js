const pool = require('../config/db');

module.exports = {
  async createEvent({ user_id, role_id, action }) {
    const res = await pool.query(
      'INSERT INTO "Event" (user_id, role_id, action) VALUES ($1, $2, $3) RETURNING *',
      [user_id, role_id, action]
    );
    return res.rows[0];
  },

  async updateEvent(id, action) {
    const res = await pool.query(
      'UPDATE "Event" SET action = $1 WHERE id = $2 RETURNING *',
      [action, id]
    );
    return res.rows[0];
  },

  async deleteEvent(id) {
    await pool.query('DELETE FROM "Event" WHERE id = $1', [id]);
  }
};
