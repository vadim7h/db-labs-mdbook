const pool = require('../config/db');

module.exports = {
  async getAllProjects() {
    const res = await pool.query('SELECT * FROM "Project"');
    return res.rows;
  },

  async getProjectsByUserId(user_id) {
    const res = await pool.query(
      'SELECT p.* FROM "Project" p JOIN "User_Project" up ON p.id = up.project_id WHERE up.user_id = $1',
      [user_id]
    );
    return res.rows;
  },

  async createProject({ name, user_ids }) {
    const projectRes = await pool.query(
      'INSERT INTO "Project" (name) VALUES ($1) RETURNING *',
      [name]
    );
    const project = projectRes.rows[0];

    for (const userId of user_ids) {
      await pool.query(
        'INSERT INTO "User_Project" (user_id, project_id) VALUES ($1, $2)',
        [userId, project.id]
      );
    }

    return project;
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
  }
};
