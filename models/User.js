const { promise } = require('../lib/db');

function User(id, username, password, email) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
}

User.prototype.update = function(data, value) {
    this[data] = value;
    return promise.query('UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?', [this.username, this.password, this.email, this.id]);
}

User.prototype.delete = function() {
    return promise.query('DELETE FROM users WHERE id = ?', [this.id]);
}

module.exports = User;