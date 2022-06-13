const path = require('path');
const express = require('express');
const cred=require('./cred')
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const app = express();
const cors = require('cors')
app.use(cors())
const port=5000;
// const buildPath = path.join(__dirname, '..', 'build');
app.use(express.json());
// app.use(express.static(buildPath)); 
 
app.post('/send',(req,res)=>{
  const error=validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
  try{
  const mail = nodemailer.createTransport({

  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
      user: cred.user,
      pass: cred.password
  }
    });
 
    var mailOptions = {
    //     from: cred.user,
        to: req.body.to, 
        subject: req.body.subject, 
        text:req.body.description,
        
    };
     
    mail.sendMail(mailOptions, function(error){
        if (error)
        {
          res.json({status: false, respMesg: 'There is some error'})
        } 
        else
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
      });
    }
    catch(error){
      res.status(500).send("some internal error occured")
    }
});

 
// listen to the port
app.listen(port, () => {
    console.log(`server start on http://localhost:${port}`);
  });