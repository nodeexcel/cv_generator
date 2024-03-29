import express from "express"
import {signup,signin,logout,addResume,getUser,saveTemplet,getTemplet,updateTemplet,deleteCv} from '../controllers/user.controller.js'
import {isExist, verifyUser} from '../middleware/user.middleware.js'
import { upload } from "../config/multerConfig.js"

export const userRoute = express.Router()

userRoute.get('/get', verifyUser, getUser)
userRoute.post('/auth/signup',isExist, signup)
userRoute.post('/auth/signin', isExist, signin)
userRoute.post('/upload', verifyUser, upload.single('resume'), addResume)
userRoute.post('/logout', logout)
userRoute.post('/cv/create',verifyUser, saveTemplet)
userRoute.get('/cv/fetch/:id',verifyUser, getTemplet)
userRoute.put('/cv/update/:id',verifyUser, updateTemplet)
userRoute.delete('/cv/delete/:id',verifyUser, deleteCv)
