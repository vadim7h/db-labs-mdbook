const pool = require('../config/db');

const Team = {
  async getAll() {
    const { rows } = await pool.query(`
      SELECT tm.*, p.name as project_name
      FROM "Team" tm
      JOIN "Project" p ON tm.project_id = p.id
    `);
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(`
      SELECT tm.*, p.name as project_name
      FROM "Team" tm
      JOIN "Project" p ON tm.project_id = p.id
      WHERE tm.id = $1
    `, [id]);
    return rows[0];
  },

  async create({ name, project_id }) {
    // Verify project exists first
    const project = await pool.query(
      'SELECT id FROM "Project" WHERE id = $1', 
      [project_id]
    );
    
    if (project.rows.length === 0) {
      throw new Error('Project not found');
    }

    const { rows } = await pool.query(
      `INSERT INTO "Team" 
       (name, project_id) 
       VALUES ($1, $2) 
       RETURNING *`,
      [name, project_id]
    );
    return rows[0];
  },

  async update(id, { name, project_id }) {
    // Verify project exists if being updated
    if (project_id) {
      const project = await pool.query(
        'SELECT id FROM "Project" WHERE id = $1', 
        [project_id]
      );
      
      if (project.rows.length === 0) {
        throw new Error('Project not found');
      }
    }

    const { rows } = await pool.query(
      `UPDATE "Team" 
       SET name = COALESCE($1, name), 
           project_id = COALESCE($2, project_id) 
       WHERE id = $3 
       RETURNING *`,
      [name, project_id, id]
    );
    return rows[0];
  },

  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM "Team" WHERE id = $1 RETURNING *', 
      [id]
    );
    return rows[0];
  },

  async getTeamsByProject(project_id) {
    const { rows } = await pool.query(
      'SELECT * FROM "Team" WHERE project_id = $1',
      [project_id]
    );
    return rows;
  }
};

module.exports = Team;