const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, 
    auth: {
      user: process.env.USERNAME, 
      pass: process.env.PASSWORD, 
    },
  });
  let mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Mailgen',
      link: 'https://mailgen.js/',
    },
  });


const registerMail = async (req,res) =>{
    const {username,userMail, text, subject} =  req.body;

    let email = {
        body:{
            name: username,
            intro:text || 'hello',
            outro:'reply to this'
        }
    }
    let emailBody = mailGenerator.generate(email);
    let message ={
        from:process.env.USERNAME,
        to:userMail,
        subject: subject || 'signup successfully',
        html: emailBody
    }
    transporter.sendMail(message).then(res.status(200).json({msg:'mail sent'})).catch(res.status(500).json({error:error.message}))
}

module.exports = registerMail