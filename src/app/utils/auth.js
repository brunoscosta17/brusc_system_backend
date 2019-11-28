'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

module.exports = {
    encryptPassword: (password) => {
        return bcrypt.hashSync(password, saltRounds);
    },
    decryptPassword: (password, passwordHash) => {
        return bcrypt.compareSync(password, passwordHash);
    },
    createToken: (user) => {
        return jwt.sign({ data: user }, 'brusc_system', { expiresIn: '1h' });
    },
    validateTokenRoute: (req, res, next) => {
        let token = req.headers['authorization'];
        jwt.verify(token, 'brusc_system', (error, result) => {
            if (result) next();
            res.status(403).json({ message: 'Access permission denied!' });
        });
    },
    validateToken: (req, res, next) => {
        let token = req.headers['authorization'];
        // console.log('req.headers', req.headers);
        console.log('TOKEN', token);
        jwt.verify(token, 'brusc_system', (error, result) => {
            if (result) {
                next(res.status(200).json(true));
            }
            else {
                res.status(403).json('Token expired or invalid!');
            }
        });
    }
}

