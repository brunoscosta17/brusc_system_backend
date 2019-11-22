'use strict';

const app = require('./src/app/index');
const db = require('./src/app/utils/db');

let server = app.listen(process.env.PORT || 3001, () => {
    let port = server.address().port;
    console.log('App running on port', port);
    // db.getConnection();
});