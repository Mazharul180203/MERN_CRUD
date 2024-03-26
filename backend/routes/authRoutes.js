import express from "express";
const router = express.Router();

import * as controller from '../controllers/appController.js'


//POST Method


router.route('/register').post(controller.register)
router.route('/login').post(controller.verifyUser,controller.login);
router.route('/authenticate').post((req, res) => res.end());



//GET Method
router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.generateOTP)
router.route('/verifyOTP').get(controller.verifyOTP)
router.route('/creatResetSession').get(controller.createResetSession);


//PUT Method

router.route('/updateUser').put(controller.updateUser)
router.route('/resetPassword').put(controller.resetPassword)




export default router;