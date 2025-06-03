const db = require('../config/db');

const getAllUsers = () => {
  return db.query('SELECT * FROM users ORDER BY id');
};

const getUserById = (id) => {
  return db.query('SELECT * FROM users WHERE id = $1', [id]);
};

const createUser = (name, email) => {
  return db.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
};

const updateUser = (id, name, email) => {
  return db.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    [name, email, id]
  );
};

const deleteUser = (id) => {
  return db.query('DELETE FROM users WHERE id = $1', [id]);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
