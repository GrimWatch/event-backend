const Event = require('../models/eventModel')
const APIFeatures = require('./../utils/helper');

//this feature is not implemented because we store the image in the database --Ashwin
// const multer = require('multer');



// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/img/events');
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1];
//         const name = req.body.name.split(" ").join("-")
//         cb(null, `event-${name}-${Date.now()}.${ext}`);
//     }
// });

// const multerFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image')) {
//         cb(null, true);
//     } else {
//         cb(new Error('Not an image! Please upload only images.', 400), false);
//     }
// };

// const upload = multer({
//     storage: multerStorage,
//     fileFilter: multerFilter
// });


// exports.EventPhoto = upload.single('image');






exports.getAllEvent = async (req, res) => {
    try {

        const features = new APIFeatures(Event.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const events = await features.query;

        res
            .status(200)
            .json({
                status: 'success',
                data: events
            })

    } catch (error) {
        res
            .status(400)
            .json({
                status: 'fail',
                data: error.message
            })

    }
}

exports.getEvent = async (req, res) => {
    try {

        const event = await Event.findById(req.params.id)
        res
            .status(200)
            .json({
                status: 'success',
                data: event
            })

    } catch (error) {
        res
            .status(400)
            .json({
                status: 'fail',
                data: error.message
            })

    }
}

exports.createEvent = async (req, res) => {
    try {

        // if(req.file) req.body.image=`http://localhost:8000/img/events/${req.file.filename}`;
        
        const newEvent = await Event.create(req.body);
        res
            .status(200)
            .json({
                status: 'success',
                data: newEvent
            })

    } catch (error) {
        res
            .status(400)
            .json({
                status: 'fail',
                data: error.message
            })

    }
}

exports.updateEvent = async (req, res) => {
    try {
 
        // if(req.file) req.body.image=`http://localhost:8000/img/events/${req.file.filename}`;
        
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res
            .status(200)
            .json({
                status: 'success',
                data: event
            })

    } catch (error) {
        res
            .status(400)
            .json({
                status: 'fail',
                data: error
            })

    }
}

exports.deleteEvent = async (req, res) => {
    try {

        await Event.findByIdAndDelete(req.params.id)
        res
            .status(204)
            .json({
                status: 'success',
                data: "done"
            })

    } catch (error) {
        res
            .status(400)
            .json({
                status: 'fail',
                data: error.message
            })

    }
}