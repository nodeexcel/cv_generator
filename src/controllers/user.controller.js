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
        const accessToken = await createToken({id:user._id, email:user.email,fullname:user.fullname, mobile:user.mobile})
        // res.cookie('accessToken',accessToken)
        res.status(200).send({success:true, message:'you are successfully logged in', user, accessToken})
    } catch (error) {
        res.status(501).send({success:false, message:error.message});
    }
}

export const addResume = async(req, res)=> {
    const {id} = req.user
    if(!req.file) return res.status(400).send({success:false, message:"file not selected"})
    try {
        const user = await userServices.uploadCv(id,req.file.filename,req.body.templetId)
        res.status(200).send({success:true, message:'file uploaded', user})
    } catch (error) {
        res.status(501).send({success:false, message:error.message});
    }
}

export const getUser = async(req, res)=> {
    const {id} = req.user
    try {
        const user = await userServices.getUser(id)
        res.status(200).send({success:true, message:'user fetched successfully', user})
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

export const saveTemplet = async(req, res)=> {
    try {
        const {id} = req.user
        const data = await userServices.saveTemplet(id, req.body)
        return res.status(200).send({success: true, message:"Resume saved", data})
    } catch (error) {
        res.status(501).send({success:false, message:error.message});
    }
}

export const getTemplet = async(req, res)=> {
    try {
        const {id} = req.params
        const data = await userServices.getTemplet(id)
        res.status(200).send({success: true, message:"Resume fetched", data})
    } catch (error) {
        res.status(501).send({success:false, message:error.message});
    }
}

export const updateTemplet = async(req, res)=> {
    try {
        const {id} = req.params
        const data = await userServices.updateTemplet(id,req.body)
        res.status(200).send({success: true, message:"Resume Updated", data})
    } catch (error) {
        res.status(501).send({success:false, message:error.message});
    }
}

export const deleteCv = async(req, res)=> {
    try {
        const cv_id = req.params
        const {id} = req.user
        const data = await userServices.deleteCv(cv_id.id,id)
        res.status(200).send({success: true, message:"Resume Deleted", data:data})
    } catch (error) {
        res.status(501).send({success:false, message:error.message});
    }
}

const createToken = async(payload) => await jwt.sign(payload, constant.SECRET_KEY);