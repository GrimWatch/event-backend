const express = require('express');
const eventController = require('../controllers/eventController')
const router = express.Router();

router
    .route('/')
    .get(eventController.getAllEvent)
    // .post(eventController.EventPhoto,eventController.createEvent)
    .post(eventController.createEvent)

router
    .route('/:id')
    .get(eventController.getEvent)
    // .patch(eventController.EventPhoto,eventController.updateEvent)
    .patch(eventController.updateEvent)
    .delete(eventController.deleteEvent)


module.exports = router;
