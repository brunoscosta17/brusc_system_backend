'use strict';

let moment = require('moment');
moment.locale('pt-BR');

module.exports = {
    createUser: (connection, user) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO users SET ?`, user, (error) => {
                if (error) {
                    console.log("Error trying to create an user!", error);
                    reject(error);
                } else {
                    resolve(resolve);
                }
            });
        });
    },
    getUser: (connection, email) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE email = ?`, email, (error, result) => {
                if (error) {
                    console.log("Error on get user!", error);
                    reject(error);
                } else {
                    resolve(result[0]);
                }
            });
        });
    },
    login: (connection, user) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE users SET lastLogin = ? WHERE email = ?`, [user.date, user.email], (error, result) => {
                if (error) {
                    console.log("Error on login!", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },
    resetPassword: (connection, user) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE users SET password = ?, lastResetPassword = ? WHERE email = ?`, [user.password, user.lastResetPassword, user.email], (error, result) => {
                if (error) {
                    console.log("Error on update password!", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
}