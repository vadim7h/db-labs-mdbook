const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/', eventController.create);
router.put('/:id', eventController.update);
router.delete('/:id', eventController.remove);

module.exports = router;
