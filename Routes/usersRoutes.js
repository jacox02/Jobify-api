const express = require("express");
const db = require('../models');
const router = express.Router();
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const moment = require ('moment');
const connection = require("../Database/database");

router.get('/', async (req, res) =>{
    const users = await Users.getAll();
    res.json(Users);
});

module.exports = router;

/*Registro de usuarios*/
const insert = ({User_Name, User_Email, User_Password}) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users ( User_Name, User_Email, User_Password) VALUES (?, ?, ?, ?)', [User_Name, User_Email, User_Password], 
        (result) => {
            if (err) reject(err)
            if(result){
                resolve(result)
            };
        });
    });
};

/*Obtener usuarios por su Email*/
const getByEmail = (pEmail) => {
    return new Promise((resolve, reject) =>{
        db.query('SELECT * FROM users WHERE User_Email = ?', [pEmail, (err, rows) => {
            if (err) reject (err)
            resolve(rows[0])
        }]);
    });
};


module.exports = {
    getAll: getAll,
    insert: insert,
    getByEmail: getByEmail
}


/*Manejador de la rutas register*/

router.post('/register', async (req, res) => {
    console.log(req.body);
    req.body.User_Password = bcrypt.hashSync(req.body.User_Password, 10);
    const result = await Users.insert(req.body);
    res.json(result);
});

/*TOKEN*/
const createToken = (users) => {
    let payload = {
        User_ID: users.User_ID,
        createdAt: moment().unix(),
        expiresAt: moment().add(1, 'days').unix()
    }
    return jwt.enconde(payload, process.env.TOKEN_KEY);
}