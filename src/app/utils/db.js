'use strict';

const mysql = require('mysql');
const config = require('../../db/config');
const connect = mysql.createPool(config);

module.exports = {
    getConnection: () => {
        return new Promise((resolve, reject) => {
            connect.getConnection((error, connection) => {
                if (error) {
                    console.log('Error trying to connect to the database!', error);
                    reject(error);
                } else {
                    console.log('Connected to the database!');
                    resolve(connection);
                }
            });
        });
    }
};