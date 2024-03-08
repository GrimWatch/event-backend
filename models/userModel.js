const mongoose = require("mongoose");
const validator = require('validator');


const userSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: [true, "Student name is required"]
  },
  email: {
    type: String,
    required: [true, "Student name is required"],
    unique:[true,"email already register."],
    validate: [validator.isEmail, "please enter a valid email"],

  },
  number: {
    type: String,
    minlength: [10, "Enter a valid 10 digit number"],
    maxlength: [10, "Number should contain 10 digits"],
    required: [true, "Student name is required"]
  },
  collegeName: {
    type: String,
    required: [true, "College Name  is required"]
  },

  technicalEvents: [String],
  nonTechnicalEvents: [String],

  userPaymentPhoto: {
    type: String,
    required: [true, "please upload the image"]
  },

  isVerified:{
    type:Boolean,
    default:false
    }
    
})

const User = mongoose.model("User", userSchema);

module.exports=User