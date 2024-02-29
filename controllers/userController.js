const User = require('../models/userModel')
const APIFeatures = require('./../utils/helper');
const multer = require('multer');



const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/users');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        const name = req.body.name.split(" ").join("-")

        cb(null, `user-${name}-${req.body.email}-${Date.now()}.${ext}`);
    }
});


const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});


exports.userPaymentPhoto = upload.single('userPaymentPhoto');


exports.isEmailExist = async (req, res) => {
    try {

        const user = await User.findOne({email:req.body.email})

        if (!user) {

            res.status(200)
            .json({
                status: 'success',
                data: "email does not exist"
            })
    }
    

        else {
            res.status(400)
                .json({
                    status: 'fail',
                    data: "This email has already been registered "
                })
        }


    } catch (error) {
        res
            .status(400)
            .json({
                status: 'fail',
                data: error.message
            })

    }

}


exports.getAllUser = async (req, res) => {

    try {

        const features = new APIFeatures(User.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const users = await features.query;

        res
            .status(200)
            .json({
                status: 'success',
                data: users
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

exports.getUser = async (req, res) => {
    try {

        const user = await User.findById(req.params.id)
        res
            .status(200)
            .json({
                status: 'success',
                data: user
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


exports.createUser = async (req, res) => {
    try {

        console.log(req.body)

        if (req.file) req.body.userPaymentPhoto = `http://localhost:8000/img/users/${req.file.filename}`;

        const newUser = await User.create(req.body);
        res
            .status(200)
            .json({
                status: 'success',
                data: newUser
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

exports.updateUser = async (req, res) => {
    try {

        if (req.file) req.body.userPaymentPhoto = `http://localhost:8000/img/users/${req.file.filename}`;

        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res
            .status(200)
            .json({
                status: 'success',
                data: user
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

exports.deleteUser = async (req, res) => {
    try {

        await User.findByIdAndDelete(req.params.id)
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