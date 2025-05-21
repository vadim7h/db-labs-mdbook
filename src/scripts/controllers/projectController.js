const Project = require('../models/projectModel');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.getAll();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.getById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.update(req.params.id, req.body);
    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.delete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Optional: Get all teams under a project
exports.getProjectTeams = async (req, res) => {
  try {
    const teams = await Project.getTeams(req.params.project_id);
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};