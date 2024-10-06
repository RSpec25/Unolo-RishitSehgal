const express = require('express');
const router = express.Router();
const { getAllEvents, joinEvent, viewParticipants, cancelParticipation} = require('../controllers/eventController');

router.get('/', getAllEvents);
router.post('/:eventId/join', joinEvent);
router.get('/:eventId/participants', viewParticipants);
router.post('/:eventId/cancel', cancelParticipation);

module.exports = router;
