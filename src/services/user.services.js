import { User } from "../models/user.model.js"

export const isUser = async (email) =>{
    return await User.findOne({email})
} 
export const signup = async (user) => {
    return await User.create(user)
}