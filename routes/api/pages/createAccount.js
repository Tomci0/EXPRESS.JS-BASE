const users = require('../../../lib/users');

module.exports = {
    "url": '/createAccount',
    "post": (req, res) => {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.json({error: 'Please fill out all fields.'});
        }

        if (password.length < 6) {
            return res.json({error: 'Password must be at least 6 characters long.'});
        }

        if (username.length < 3) {
            return res.json({error: 'Username must be at least 3 characters long.'});
        }

        if (username.length > 20) {
            return res.json({error: 'Username must be less than 20 characters long.'});
        }
        
        // sprawdź czy podany email jest poprawny

        if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            return res.json({error: 'Email is not valid.'});
        }

        if (users.get(username)) {
            return res.json({error: 'Username already exists.'});
        }

        if (users.get(email)) {
            return res.json({error: 'Email already exists.'});
        }

        users.add(new User(null, username, password, email));
    },
}