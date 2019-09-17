const bcrypt = require('bcryptjs');
const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ error: 'No credentials provided.' });
    }
};

// code before adding 'cookies' code (via express-session)
// module.exports = (req, res, next) => {
//     let { username, password } = req.headers;
//     Users.findBy({ username })
//         .first()
//         .then(user => {
//             if (user && bcrypt.compareSync(password, user.password)) {
//                 next();
//             } else {
//                 res.status(401).json({ error: 'No credentials provided.' });
//             }
//         })
//         .catch(error => {
//             res.status(500).json(error);
//         });
// };

function fetch() {
    const reqOptions = {
        headers: {
            username: '',
            password: '',
        },
    };
    // axios.get(url, reqOptions).then().catch()
    // axios.post(url, data, reqOptions).then().catch()
}
