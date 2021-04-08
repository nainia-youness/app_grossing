const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');

const userSchema = require("../models/userCon").user;
const tconfig = require('../config/config');






// Login function
exports.login = (req, res, next) => {
    let getUser;
    console.log(req.body.email)
    userSchema.findOne({
        where:{
            email: req.body.email
        }
        
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed: User not found!"
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(isValidPass => {
        if (!isValidPass) {
            return res.status(401).json({
                message: "Authentication failed : Incorrect password !"
            });
        }
        let jwtToken = jwt.sign({
            userId: getUser.user_id,
            dlog: Date.now()
        }, tconfig.jwt_secret_t, {
            expiresIn: tconfig.tokenExpireIn
        });
        res.status(200).json({
// --------------------------
            _id: getUser.user_id,
            username: getUser.username,          
            token: jwtToken,
            expiresIn: tconfig.tokenExpireIn,
            message: 'Authentication was succesful'
// --------------------------
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed :" + err.message
        });
    });
};








// Sign-up function
exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    else {
        bcrypt.hash(req.body.password, 10).then((hash) => {
            userSchema.create({
                username: req.body.username,
                email: req.body.email,
                password: hash
            }).then((response) => {
                res.status(201).json({
                    message: "User successfully registred!",
                    //result: response
                });
            }).catch(error => {
                res.status(500).json({
                    err: "failed ",
                    error: error
                });
            });
        });
    }
};






// rtoken function
exports.rtoken = (req, res, next) => {

};






// Logout function
exports.logout = (req, res, next) => {

};
