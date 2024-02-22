import * as userServices from "../services/user.services.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { constant } from "../config/constants.js";

export const isExist = async (req, res, next)=>{
    try {
        const user = await userServices.isUser(req.body.email);
        if(user){
            if(req.path.includes('/signup')) return res.status(409).send({message:"User already exists"})
            else{
              if(! await bcrypt.compare(req.body.password, user.password))
                return res.status(403).send({message:"email or password is incorrect"})
                req.user = user
                next()
            }
        }else{
            if(req.path.includes('/signin')) return res.status(404).send({message:"User not found"})
            
            req.body.password = await bcrypt.hash(req.body.password, 10)
            return next()
        }
    } catch (error) {
        res.status(501).send({success:false, message:error.message});
    }
}

export const verifyUser = async(req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) return res.status(403).send({message:"anauthorized or access token missing"})
        const decodedUser = await jwt.verify(token, constant.SECRET_KEY);
        if(!decodedUser) return res.status(401).send({message:"unauthorized"});
        req.user = decodedUser;
        next();
    } catch (error) {
        res.status(500).send({success:false, message:error.message});
    }
}