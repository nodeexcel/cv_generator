import mongoose from 'mongoose';
const cvSchema = new mongoose.Schema({
    accountSetting:{
        firstName:{type:String},
        lastName:{type:String},
        phoneNo:{},
        links:{
            github:{},
            linkedin:{},
            website:{}
        }
    },
    workEcperince:[
        {
            title:{
                
            },

        }
    ],
    userId:{
        type:String
    }
})

export const Cv = mongoose.model('Cv', cvSchema);