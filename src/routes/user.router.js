import express from "express"
import {signup,signin,logout,addResume,getUser} from '../controllers/user.controller.js'
import {isExist, verifyUser} from '../middleware/user.middleware.js'
import { upload } from "../config/multerConfig.js"

export const userRoute = express.Router()

userRoute.post('/auth/signup',isExist, signup);
userRoute.post('/auth/signin', isExist, signin);
userRoute.post('/upload', verifyUser, upload.single('resume'), addResume);
userRoute.get('/get', verifyUser, getUser);
userRoute.post('/logout', logout);