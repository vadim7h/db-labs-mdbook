const pool = require('../config/db');

module.exports = {
  async getAllProjects() {
    const res = await pool.query('SELECT * FROM "Project"');
    const projects = res.rows;
    for (const project of projects) {
      const usersRes = await pool.query(
        'SELECT user_id FROM "User_Project" WHERE project_id = $1',
        [project.id]
      );
      project.user_ids = usersRes.rows.map(row => row.user_id);
    }
    return projects;
  },

  async getProjectsByUser(user_id) {
    const res = await pool.query(
      'SELECT p.*, array_agg(up.user_id) AS user_ids FROM "Project" p JOIN "User_Project" up ON p.id = up.project_id WHERE up.user_id = $1 GROUP BY p.id',
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

    project.user_ids = user_ids;
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
