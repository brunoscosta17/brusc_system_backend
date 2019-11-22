'use strict';

const dao = require('../../../../dao.js');

const sqlFunctions = require('../../utils/db');

let moment = require('moment');
moment.locale('pt-BR');

module.exports = {
    login: async (req, res, next) => {
        let connection;
        try {
            connection = await sqlFunctions.getConnection();

            let user = await dao.getUser(connection, req.body.email);
            const email = req.body.email;
            console.log(user);
            console.log(!user);
            if (!user) {
                res.status(403).json({ message: "Invalid username or password!" });
            } else {
                const obj = {
                    'id': user.id,
                    'email': email,
                    "date": moment().format('YYYY-MM-DD HH:mm:ss')
                };

                await dao.login(connection, obj);
                res.status(200).json({ message: "Login success!" });

                connection.release();
            }
        } catch (error) {
            console.log("Error on authenticate!", error);
            res.status(500).json({ message: "Error on authenticate!", error });
            connection.release();
        }
    },
    resetPassword: async (req, res, next) => {
        try {
            let connection = await sqlFunctions.getConnection();
            const email = req.body.email;
            const password = req.body.password;
            const user = {
                "email": email,
                "password": password,
                "lastResetPassword": moment().format('YYYY-MM-DD HH:mm:ss')
            };
            await dao.resetPassword(connection, user);
            res.status(200).json({ password: user.password });
        } catch (error) {
            console.log("ERROR RESET PASSWORD!", error);
            res.status(500).json({ message: "Error on reset password!", error: error });
        }
    },
}