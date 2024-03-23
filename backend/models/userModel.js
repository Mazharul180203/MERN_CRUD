import mongoose from "mongoose";


export const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,"Please provide unique username"],
        unique : [true,"UserName Exit"]
    },
    password : {
        type : String,
        required : [true,"Please provide password"],
        unique : false,
    },
    email : {
        type : String,
        required : [true,"Please provide unique email"],
        unique : true,
    },
    firstName : {type: String},
    lastName : {type: String},
    mobile : {type: Number},
    address : {type: String},
    profile : {type: String}

});
export const user =mongoose.model('User', UserSchema);