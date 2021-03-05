var nodemailer = require("nodemailer");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());

app.post("/sendemail", (req, res) => {
  nodemailer.createTestAccount((err, accont) => {
    const htmlEmail = `
        <h3> Interesado en el puesto <h3>
        <ul>
        <li>Email: ${req.body.email}</li>
        <li>Numero telefonico: ${req.body.number}</li>
        </ul>
        <h3>Mensaje</h3>
        <p> ${req.body.mensaje}</p>
        `;

    let transporter = nodemailer.createTransport({
      service: "gmail",
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
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }
      alert("CORREO ENVIADO CON EXITO");
      console.log(info.mensaje);
      console.log(nodemailer.getTestMessageUrl(info));
    });
  });
});
<<<<<<< HEAD
module.exports = app;
=======
module.exports = app;
>>>>>>> 9fb18362286f60b39fc06de834b0c0ff14412363
