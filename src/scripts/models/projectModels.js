const pool = require('../config/db');

module.exports = {
  async getAllProjects() {
    const res = await pool.query('SELECT * FROM "Project"');
    return res.rows;
  },

  async createProject({ name }) {
    const res = await pool.query(
      'INSERT INTO "Project" (name) VALUES ($1) RETURNING *',
      [name]
    );
    return res.rows[0];
  },

  async updateProject(id, name) {
    const res = await pool.query(
      'UPDATE "Project" SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    return res.rows[0];
  },

  async deleteProject(id) {
    await pool.query('DELETE FROM "Project" WHERE id = $1', [id]);
  },

  async getProjectsByUser(userId) {
    const res = await pool.query(
      `SELECT p.* FROM "Project" p
       JOIN "User_Project" up ON p.id = up.project_id
       WHERE up.user_id = $1`,
      [userId]
    );
    return res.rows;
  },

  async addUserToProject({ user_id, project_id, role_id = null, team_id = null }) {
    const res = await pool.query(
      'INSERT INTO "User_Project" (user_id, project_id, role_id, team_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, project_id, role_id, team_id]
    );
    return res.rows[0];
  }
};
