const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
         type:String,
         required:true,
    },
    height:{
        type:String,
        required:true,
    },
    weight:{
        type:String,
        required:true,
    },
    bmi:{
        type:String,
        required:true,
    }
})

const UserModel = mongoose.model('User',UserSchema);
module.exports = UserModel;