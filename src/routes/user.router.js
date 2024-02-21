import express from "express"
import {signup,signin,logout} from '../controllers/user.controller.js'
import {isExist} from '../middleware/user.middleware.js'

export const userRoute = express.Router()

userRoute.post('/auth/signup',isExist, signup);
userRoute.post('/auth/signin', isExist, signin);
userRoute.post('/logout', logout);