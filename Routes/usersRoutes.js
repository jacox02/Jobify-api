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
        expiresAt: moment().add(1, 'day').unix()
    }
    return jwt.enconde(payload, process.env.TOKEN_KEY);
}

/*MANEJO DEL LOGIN*/

router.post('login', async(req, res) => {
    const user = await Users.getByEmail(req.body.email)
    if (user === undefined){
        res.json({
            error:'Error, email or password not fount'
        })
    } else{
        const equals = bcrypt.compareSync(req.body.User_Password, User_Password);
        if (!equals){
            res.json({
                error:'Error, email or password not found'
            });
        }else{
            res.json({
                succesfull: createToken(user),
                done: 'Login correct'
            });
        }
    }
})

