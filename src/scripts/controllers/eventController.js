const Event = require('../models/eventModel');

module.exports = {
  async create(req, res) {
    try {
      const event = await Event.createEvent(req.body);
      res.status(201).json(event);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await Event.deleteEvent(req.params.id);
      res.json({ message: `Подію ${req.params.id} видалено` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const event = await Event.updateEvent(req.params.id, req.body.action);
      res.json(event);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
