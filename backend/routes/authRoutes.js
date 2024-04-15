import express from "express";
const router = express.Router();

import * as controller from '../controllers/appController.js'
import Auth,{localVariables} from '../middleware/auth.js'
import {registerMail} from "../utility/emailHelper.js";


//POST Method


router.route('/register').post(controller.register)
router.route('/registerMail').post(registerMail);
router.route('/authenticate').post(controller.verifyUser,(req, res) => res.end());
router.route('/login').post(controller.verifyUser,controller.login);



//GET Method
router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.verifyUser,localVariables,controller.generateOTP)
router.route('/verifyOTP').get(controller.verifyOTP)
router.route('/creatResetSession').get(controller.createResetSession);


//PUT Method

router.route('/updateUser').put(Auth,controller.updateUser)
router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword)




export default router;