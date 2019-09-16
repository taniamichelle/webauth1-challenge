const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./users-model');
const restricted = require('../auth/restricted-middleware');

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error retrieving users." });
        });
});

router.post('/register', (req, res) => {
    let { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 14); // it's 2 ^ 14, not 14 rounds
    Users.add({ username, password: hash })
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ message: `Welcome ${user.username}!` });
            } else {
                res.status(401).json({ message: 'You cannot pass!' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

router.get('/hash', (req, res) => {
    const name = req.query.name;
    const hash = bcrypt.hashSync(name, 8); // use bcryptjs to hash the name
    res.send(`the hash for ${name} is ${hash}`);
});

module.exports = router;