const User = require('../models/userModel');
const Project = require('../models/projectModel');

module.exports = {
  async getAll(req, res) {
    try {
      const users = await User.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const user = await User.getUserById(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const user = await User.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await User.deleteUser(req.params.id);
      res.json({ message: `Користувача ${req.params.id} видалено` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getProjects(req, res) {
    try {
      const projects = await Project.getProjectsByUser(req.params.id);
      res.json(projects);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
