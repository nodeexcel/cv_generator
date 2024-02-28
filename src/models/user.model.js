import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        requird:true,
    },
    lastname:{
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
    cvLink:[{
        link:{
            type:String,
            default:null
        },
        templetId:{
            type:String,
            default:null
        },
        updatedAt:Date,
    }]
}, {timestamps:true})

export const User = mongoose.model('User', userSchema);