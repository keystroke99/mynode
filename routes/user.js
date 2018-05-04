const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt   =   require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    let email = req.body.email;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {

            // console.log(hash);

            // Check if Email exits

            User.findOne({ email }, (err, existingUser) => {
                if (err) {
                    return res.send(err);
                }
                if (existingUser) {
                    return res.json({
                        'message': 'User already exists',
                        'userdata': existingUser
                    }
                    );
                } else {
                    const user = new User({
                        email: email,
                        password: hash
                    });

                    user
                        .save()
                        .then(result => {
                            //console.log(result);
                            res.status(201).json({
                                message: "User created",
                                userdata: result
                            });
                        });

                }

            });
        });
    });

});

router.post('/login', (req, res, next) => {
    let email = req.body.email;
    console.log(req.body);
    User.find({ email }, function (err, result) {
        // console.log(result);
        if (err) return res.send(err);
        if(result.length > 0 ) {
            
            bcrypt.compare(req.body.password, result[0].password, function(err, pwdmatch) {
                //console.log(pwdmatch);
                if (err) return res.send(err);
                if(pwdmatch) {
                    const token =   jwt.sign({
                        email: result[0].email,
                        password: result[0].password
                    },
                    "damuluri",
                    {
                        expiresIn: "1h"
                    });
                   res.json({ message: 'Login Successfull!',
                            token: token });
                } else {
                    res.status(401).json({ message: 'Login Failed!'});
                }
                
            });
        } else {
            res.status(401).json({ message: 'user not found!'});
        }
        
    });
});

module.exports = router;