const nodemailer=require('nodemailer');

module.exports={
 
  sentMail:(email, otp)=> {
    return new Promise((resolve, reject)=>{
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'abhiramivv77@gmail.com',
        pass: 'spcanujclhwpdaaj'
      }
  });
  var mailOptions = {
    from:process.env.EMAIL,
      to: email,
      subject: "Elance Magico mail verification",
      html: `
                <h1>Verify Your Email For Elance Magico</h1>
                  <h3>use this code <h2>${otp}</h2> to verify your email</h3>
                 
               `
  };
  transporter.sendMail(mailOptions,(err,res)=>{
      if(err){
          console.log(err);
      }
      else {
  
      }
  });
    })
    
}
,

approvedMail:(email,name)=> {
  return new Promise((resolve, reject)=>{
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
});
var mailOptions = {
  from:process.env.EMAIL,
    to: email,
    subject: "Application status",
    html: `   <h5> Dear ${name} <h5><br>
              <p>We are excited to inform you that your application for the event management at Elance Magico has been approved. Congratulations and welcome aboard! <br><br>
              Autocare Team</p>
               
               
             `
};
transporter.sendMail(mailOptions,(err,res)=>{
    if(err){
        console.log(err);
    }
    else {

    }
});
  })
  
},
 rejectMail:(email,name)=> {
  return new Promise((resolve, reject)=>{
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
});
var mailOptions = {
    from:process.env.EMAIL,
    to: email,
    subject: "Application status",
    html: `   <h5> Dear ${name} <h5><br><br>
    <p>
    Thank you for taking the time to apply for the event management in our Elance Magico application.<br> We appreciate your interest and effort in applying for th service.<br>
    We regret to inform you that after careful consideration of your application, we have decided not to move forward with your candidacy at this time. We understand that this news may be disappointing, but we want to assure you that the decision was based on the needs of our organization and the specific qualifications required for the role.<br>
    
    We encourage you to continue to explore other job opportunities that match your skills and experience. We will keep your resume on file, and should a suitable position arise in the future, we will not hesitate to contact you.<br>
    
    Thank you once again for your interest in working with us. We wish you all the best for your future career.<br>
    
    Sincerely,<br><br>
    AutoCare team.</p>
               
               
             `
};
transporter.sendMail(mailOptions,(err,res)=>{
    if(err){
        console.log(err);
    }
    else {

    }
});
  })
  
}

}