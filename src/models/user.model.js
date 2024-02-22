import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        requird:true,
    },
    email:{
        type:String,
        requird:true,
    },
    password:{
        type:String,
        requird:true,
    },
    mobile:{
        type:String
    },
    cvLink:{
        type:[String],
        default:null
    }
})

export const User = mongoose.model('User', userSchema);