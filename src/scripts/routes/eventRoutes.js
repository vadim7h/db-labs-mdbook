const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/', eventController.create);
router.delete('/:id', eventController.remove);
router.put('/:id', eventController.update);

module.exports = router;
