const express = require('express');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const db = require('../common/helpers');
const secrets = require('../auth/secrets');

const router = express.Router();


router.post('/register', async (req, res) => {
    const user = req.body;
    const hashedpswrd = bcrypt.hashSync(user.password, 12);
    user.password = hashedpswrd;

    try {
        const newUser = await db.addUser(user);
        res.status(201).json(newUser);
    }
    catch ({ message }) {
        res.status(500).json(message);
    }
});


router.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    if (userName && password) {
        try {
            const user = await db.findUserBy({userName}).first();
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = genJWT(user);
                res.status(200).json({
                    message: `Login Successful Welcome ${user.firstName + " " + user.lastName}`,
                    token
                });
            } else {
                res.status(401).json({
                    message: 'That user name does not exsist.'
                });
            }
        }

        catch ({ message }) {
            res.status(500).json(message);
        }
    } else {
        res.status(400).json({
            message: 'Please enter a user name and password.'
        });
    }

});



//Generate JWT

const genJWT = (user) => {

    const payload = {
        subject: 'user',
        userName: user.UserName
    };

    const secret = secrets.jwtSecret;


    const options = {
        expiresIn: '1h'
    };

    JWT.sign(payload, secret, options);

};












module.exports = router;