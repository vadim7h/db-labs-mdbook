const Project = require('../models/projectModel');

module.exports = {
  async getAll(req, res) {
    try {
      const projects = await Project.getAllProjects();
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
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getByUser(req, res) {
    try {
      const projects = await Project.getProjectsByUser(req.params.userId);
      res.json(projects);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async addUser(req, res) {
    try {
      const record = await Project.addUserToProject(req.body);
      res.status(201).json(record);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
