const express = require("express");
const jwt = require('jwt-simple');
const moment = require('moment');

const app = express();

module.exports = app;

const checkToken = (req, res, next) => {
    if (!req.headers['user_token'])
    return res.json({
        error: "you must include the header"
    });

    const token = req.headers['user_token'];
    let payload = null
    try{
        payload = jwt.decode(token, process.env.TOKEN_KEY)
    } catch(err){
        return res.json({
            error: "invalid token"
        });

    }

    if(moment().unix() > payload.expiresAt){
        return res.json({error:'Expired token'});
    }

    req.User_ID = payload.User_ID;

    next();
}

module.exports ={
    checkToken: checkToken
}