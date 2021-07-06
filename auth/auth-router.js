const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');
const restricted = require('../auth/restricted-middleware');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 14); // it's 2 ^ 14, not 14 rounds
    user.password = hash;
    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            // console.log(error);
            res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user; // save user information so cookie will be saved from session and sent back to client. client stores and sends all related cookies from that domain
                res.status(200).json({ message: `Welcome ${user.username}!` });
            } else {
                res.status(401).json({ error: 'Invalid Credentials.' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ error: "You can checkout any time you like, but you can never leave." });
            } else {
                res.status(200).json({ message: "Bye, thanks for playing!" });
            }
        })
    } else {
        res.status(200).json({ message: "You were never here to begin with..." });
    }
});

module.exports = router;