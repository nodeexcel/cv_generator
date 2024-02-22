import { User } from "../models/user.model.js"

export const isUser = async (email) =>{
    return await User.findOne({email})
} 
export const signup = async (user) => {
    return await User.create(user)
}
export const uploadCv = async (id,link) => {
    return await User.findByIdAndUpdate(id,{
        cvLink:`http://116.202.210.102:3030/resumes/${link}`
    }, {new:true})
}