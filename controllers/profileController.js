const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const userSchema = require("../models/userCon").user;

// Get Users
exports.getUsers=(req, res) => { 
    userSchema.findAll()
                .then((user) =>{ res.status(200).json(user); } ) //console.log(JSON.stringify(user[0]))
                .catch((error) => { return next(error); });
};






// Get Single User
exports.getSingleUser=(req, res, next) => {
    userSchema.findOne({
        where:{
            email: req.params.email
        }
        
    }).then((user) => {res.status(200).json({msg: user});})
    .catch((error) => { return next(error); });

}





// Update User
exports.updateUser = (req, res, next) => {

    userSchema.update(
   {username: req.body.username},
   {where: req.params.email}
        
    ).then((rowsUpdated) => {
        res.status(200).json({msg: rowsUpdated});
        console.log('User successfully updated!')
    })
    .catch((error) => { return next(error); });

/*
    userSchema.update(
        {username: req.body.username},
        {returning: true, where: {email: req.params.email}}
             
         ).then(([ rowsUpdate, [updatedUser] ]) => {
             res.status(200).json({msg:updatedUser });
             console.log('User successfully updated!')
         })
         .catch((error) => { return next(error); });
 */


};








// Delete User
exports.deleteUser =(req, res, next) => {
    userSchema.destroy({//findById
        where:{
            email: req.params.email
        }
        
    }).then((user) => {res.status(200).json({msg: user});})
    .catch((error) => { return next(error); });
};
