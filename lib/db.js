const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_PANEL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

conn.connect((err) => {
    if (err) {
        console.log('[ERROR] [MYSQL] Could not connect to database.');
        return console.log(err);
    }

    console.log('[INFO] [MYSQL] Connected to database.')
});


module.exports = {
    promise: () => {return conn.promise()},
    db: () => {return conn}
}

