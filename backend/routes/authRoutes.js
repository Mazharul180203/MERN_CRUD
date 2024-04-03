import express from "express";
const router = express.Router();

import * as controller from '../controllers/appController.js'
import Auth,{localVariables} from '../middleware/auth.js'


//POST Method


router.route('/register').post(controller.register)
router.route('/login').post(controller.verifyUser,controller.login);
router.route('/authenticate').post((req, res) => res.end());



//GET Method
router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.verifyUser,localVariables,controller.generateOTP)
router.route('/verifyOTP').get(controller.verifyOTP)
router.route('/creatResetSession').get(controller.createResetSession);


//PUT Method

router.route('/updateUser').put(Auth,controller.updateUser)
router.route('/resetPassword').put(controller.resetPassword)




export default router;