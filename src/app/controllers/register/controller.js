'use strict';

const dao = require('../../../../dao');
const auth = require('../../utils/auth');

const sqlFunctions = require('../../utils/db');

let moment = require('moment');
moment.locale('pt-BR');

module.exports = {
    register: async (req, res, next) => {
        let connection;
        try {
            connection = await sqlFunctions.getConnection();

            const firstname = req.body.firstname;
            const lastname = req.body.lastname;
            const email = req.body.email;
            const password = auth.encryptPassword(req.body.password);

            const user = {
                "firstname": firstname,
                "lastname": lastname,
                "email": email,
                "password": password,
                "created": moment().format('YYYY-MM-YY HH:mm:ss')
            }

            await dao.createUser(connection, user);

            console.log(user);

            res.status(200).json({
                message: 'User registred!',
                user: user
            });
        } catch (error) {
            if (error.code == 'ER_DUP_ENTRY') {
                console.log("User alread exists!", error);
                res.status(500).json({ error: "User alread exists!" });
            } else {
                console.log("Error on register user!", error);
                res.status(500).json({ error: "Error on register user!", error });
            }
        }
    },
}