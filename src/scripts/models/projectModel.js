const pool = require('../config/db');

const Project = {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM "Project"');
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query('SELECT * FROM "Project" WHERE id = $1', [id]);
    return rows[0];
  },

  async create({ name }) {
    if (!name) throw new Error('Project name is required');
    
    const { rows } = await pool.query(
      'INSERT INTO "Project" (name) VALUES ($1) RETURNING *',
      [name]
    );
    return rows[0];
  },

  async update(id, { name }) {
    if (!name) throw new Error('Project name is required');

    const { rows } = await pool.query(
      'UPDATE "Project" SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    return rows[0];
  },

  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM "Project" WHERE id = $1 RETURNING *',
      [id]
    );
    return rows[0];
  },

  // Optional: Get all teams under a project
  async getTeams(project_id) {
    const { rows } = await pool.query(
      'SELECT * FROM "Team" WHERE project_id = $1',
      [project_id]
    );
    return rows;
  }
};

module.exports = Project;