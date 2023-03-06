const { promise } = require('./db');
const User = require('../models/User');
const cache = require('./cache');

module.exports = {
    init: () => {
        cache.set('users', [])
        promise().query('CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, PRIMARY KEY (id))');
        promise().query('SELECT * FROM users').then(([rows, fields]) => {
            if (rows.length === 0) {
                rows.forEach((user) => {
                    cache.add(new User(user.id, user.username, user.password, user.email));
                })
            }
        });
    },
    get: (id) => {
        return cache.get('users').find((user) => {
            return user.id === id || user.username === id || user.email === id;
        });
    },
    add: (user) => {
        promise.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [user.username, user.password, user.email]).then(userData => {
            user.id = userData.insertId;
            cache.add('users', user);
        });
    },
}