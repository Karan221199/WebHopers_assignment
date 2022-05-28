const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobile:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    pic:{
        type: String,
        required: true
    }
})

mongoose.model("User",Schema);