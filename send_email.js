var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shaxzodbmaster@gmail.com',
    pass: "ScretKey"
  }
});

var mailOptions = {
  from: 'shaxzodbmaster@gmail.com', 
  to: 'ismoiljonrifatovich8181@gmail.com',
  subject: 'Salom Ismoil',
  html: '<h1><center>That was easy!</center>\
  <br/><hr/><center><img src="https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?b=1&k=20&m=517188688&s=612x612&w=0&h=x8h70-SXuizg3dcqN4oVe9idppdt8FUVeBFemfaMU7w=" width="500px" alt="XATO" /></center></h1>',
  //text:"one"
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
