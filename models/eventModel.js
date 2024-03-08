const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Event should have a name'],
        unique: [true, 'Duplicate event is not allowed']
    },

    venue: {
        type: String,
        required: [true, 'Event should have a venue'],
    },

    description: {
        type: String,
        required: [true, 'Event should have a description'],
    },

    task: {
        type: String,
        required: [true, 'Event should have a task'],
    },

    duration: {
        type: String,
        required: [true, 'Event should have a duration'],
    },

    image: {
        type: String,
        required: [true, 'Event should have a image'],
    },

    timing: {
        type: Date,
        required: [true, 'Event should have a start date'],
    },

    coOrdinateNumber: {
        type: String,
        required: [true, 'Event should have a coOrdinateNumber'],
    },
    
    whatsappGroup: {
        type: String,
        required: [true, 'Event should have a whastapp group'],
    },

    isTechnical: {
        type: Boolean,
        required: [true, 'Event should have a technical field '],
    },
    price: {
        type: String,
        default:"0"

    },
})


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;