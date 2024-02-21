import * as userServices from "../services/user.services.js";
import bcrypt from 'bcryptjs';


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