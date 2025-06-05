onst Project = require('../models/projectModel');

module.exports = {
  async getAll(req, res) {
    try {
      const projects = await Project.getAllProjects();
      res.json(projects);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getByUserId(req, res) {
    try {
      const projects = await Project.getProjectsByUserId(req.params.user_id);
      res.json(projects);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const project = await Project.createProject(req.body);
      res.status(201).json(project);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const project = await Project.updateProject(req.params.id, req.body.name);
      res.json(project);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await Project.deleteProject(req.params.id);
      res.json({ message: `Проєкт ${req.params.id} видалено` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
