const mongoose = require('mongoose');

const userSchemma = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    }
},{timestamps:true});

const userModel = mongoose.model('users', userSchemma)
module.exports= userModel;