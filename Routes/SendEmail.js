var nodemailer = require("nodemailer");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./Data");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({ storage }).single("file");

app.post("/sendemail", (req, res) => {

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
return res.status(200).send(req.file)

})
  nodemailer.createTestAccount((err, accont) => {
     const htmlEmail = `
         <h3> Interesado en el puesto <h3>
         <ul>
         <li>Numero telefonico: ${req.body.number}</li>
         </ul>
         <h3>Mensaje</h3>
         <p> ${req.body.mensaje}</p>
         `;
 
     let transporter = nodemailer.createTransport({
       host: "smtp.gmail.com",
       port: 587,
       secure: false, 
       requireTLS: true,
       auth: {
         user: "pruebaenreactsendemail@gmail.com",
         pass: "pruebasendemail", 
       },
     });
     let mailOptions = {
       from: "pruebaenreactsendemail@gmail.com",
       to: req.body.email,
       subject: "Interesado en el trabajo",
       text: req.body.mensaje,
       html: htmlEmail,
       attachments: [
         {
           filename: upload.filename,
           path: req.file.path
         }
       ]
     };
     transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        fs.unlink(req.file.path,function(err){
          if(err){
              return res.end(err)
          }else{
              console.log("deleted")
          }
        })
      }
    });
   });
 });

module.exports = app;
