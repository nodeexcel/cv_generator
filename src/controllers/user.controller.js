import * as userServices from '../services/user.services.js'
import jwt from 'jsonwebtoken';
import { constant } from '../config/constants.js';


export const signup = async(req, res)=> {
    try {
        const user = await userServices.signup(req.body);
        return res.status(200).send({success:true, message:'User Registered', user});
    } catch (error) {
        res.status(501).send({success:false, message:error.message});
    }
}

export const signin = async(req, res)=> {
    try {
        const user = await userServices.isUser(req.body.email)
        const accessToken = await createToken({id:user._id, email:user.email,fullname:user.fullname, role:user.role})
        res.cookie('accessToken',accessToken)
        res.status(200).send({success:true,message:'cookie has been set!', user})
    } catch (error) {
        res.status(501).send({success:false, message:error.message});
    }
}

export const logout = async(req, res)=> {
    try {
        res.clearCookie('accessToken')
        res.status(200).send({success: true, message:"You are Logged out"})
    } catch (error) {
        res.status(501).send({success:false, message:error.message});
    }
}

const createToken = async(payload) => await jwt.sign(payload, constant.SECRET_KEY);