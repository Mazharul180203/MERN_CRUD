import nodemailer from "nodemailer";
import {EMAIL, PASSWORD} from "../config.js";
import Mailgen from "mailgen";


let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    },
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product:{
        name: "Mailgen",
        link: 'https://mailgen.js'
    }
})

export const registerMail = (req,res)=>{
    const {username,userEmail,text,subject} = req.body;

    //body of the email

    var email = {
        body : {
            name: username,
            intro : text || 'Welcome',
            outro: 'Need help,or have a question?'
        }
    }

    var emailBody = MailGenerator.generate(email)

    let message = {
        from : EMAIL,
        to : userEmail,
        subject : subject || "Signup Successful",
        html : emailBody
    }

    // send mail

    transporter.sendMail(message)
        .then(()=>{
            return res.status(200).send({msg: "You should receive an email from us"})
        })
        .catch(error=>res.status(500).send({error}))
}