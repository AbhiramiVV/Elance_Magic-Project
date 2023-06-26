
exports.checkVerificationToken = (otp, phoneNumber) => {
  return new Promise((resolve) => {
    client.verify
      .services(TWILIO_SERVICE_ID)
      .verificationChecks.create({
        to: `+91${phoneNumber}`,
        code: otp
      })
      .then((verification_check) => {
        console.log(verification_check.status);
        if (verification_check.status === 'approved') {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        console.log(error);
        resolve(false);
      });
  });
};
var accountSid = process.env.TWILIO_ACCOUNT_SID
var authToken = process.env.TWILIO_SERVICE_ID
var twilio = require('twilio');

exports.sendVerificationToken = function(number, otp) {
  var client = new twilio(accountSid, authToken);

  client.messages
    .create({
      body: 'Your OTP is ' + otp,
      from: '3157045917',
      to: '+91' + number
    })
    .then(function(message) {
      console.log(message.sid);
    })
    .catch(function(error) {
      console.error(error);
    });
};
