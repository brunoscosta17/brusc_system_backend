'use strict';

const dao = require('../../../../dao.js');
const auth = require('../../utils/auth');

const sqlFunctions = require('../../utils/db');

let moment = require('moment');
moment.locale('pt-BR');

module.exports = {
    login: async (req, res, next) => {
        try {
            const connection = await sqlFunctions.getConnection();

            const user = await dao.getUser(connection, req.body.email);

            const isPasswordEqual = auth.decryptPassword(req.body.password, user.password);
            console.log(isPasswordEqual);

            const { email } = req.body;

            if (!user || isPasswordEqual == false) {
                res.status(403).json({ message: "Invalid username or password!" });
            } else if (isPasswordEqual) {
                const obj = {
                    'id': user.id,
                    'email': email,
                    "date": moment().format('YYYY-MM-DD HH:mm:ss')
                };

                const token = auth.createToken(user);
                console.log('token', token);

                await dao.login(connection, obj);

                res.status(200).json({ message: "Login success!" });

            }
        } catch (error) {
            console.log("Error on authenticate!", error);
            res.status(500).json({ message: "Error on authenticate!", error });
        }
    },
    updatePassword: async (req, res, next) => {
        try {
            let connection = await sqlFunctions.getConnection();
            const { email, newPassword } = req.body;
            const user = {
                "email": email,
                "newPassword": newPassword,
                "lastUpdatePassword": moment().format('YYYY-MM-DD HH:mm:ss')
            };
            await dao.updatePassword(connection, user);
            res.status(200).json({ newPassword });
        } catch (error) {
            console.log("ERROR UPDATE PASSWORD!", error);
            res.status(500).json({ message: "Error on reset password!", error: error });
        }
    },
    forgetPassword: async (req, res, next) => {
        try {
            let connection = await sqlFunctions.getConnection();

            const { email } = req.body;

            const tempPassword = moment().format('HHmmss');

            const newPassword = tempPassword;

            const verifyEmail = await dao.getUser(connection, email);

            if (verifyEmail) {
                const user = {
                    "email": email,
                    "newPassword": newPassword,
                    "lastUpdatePassword": moment().format('YYYY-MM-DD HH:mm:ss')
                };
                await dao.updatePassword(connection, user);
                res.status(200).json({ message: `New password: ${tempPassword}` });
            } else {
                console.log("ERROR RESET PASSWORD!", error);
                res.status(500).json({ message: "Error on reset password!", error });
            }
        } catch (error) {
            console.log("ERROR FORGET PASSWORD!", error);
            res.status(500).json({ message: error });
        }
    },
}