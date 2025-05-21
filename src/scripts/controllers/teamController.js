const Team = require('../models/teamModel');

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.getAll();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.getById(req.params.id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTeam = async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.project_id) {
      return res.status(400).json({ error: 'project_id is required' });
    }
    
    const newTeam = await Team.create(req.body);
    res.status(201).json(newTeam);
  } catch (err) {
    if (err.message === 'Project not found') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const updatedTeam = await Team.update(req.params.id, req.body);
    if (!updatedTeam) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(updatedTeam);
  } catch (err) {
    if (err.message === 'Project not found') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const deletedTeam = await Team.delete(req.params.id);
    if (!deletedTeam) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ message: 'Team deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTeamsByProject = async (req, res) => {
  try {
    const teams = await Team.getTeamsByProject(req.params.project_id);
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};