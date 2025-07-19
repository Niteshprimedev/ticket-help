const jwt = require('jsonwebtoken');

const generateToken = (id, secretCode, duration) => {
    return jwt.sign({ id }, secretCode, {
        expiresIn: duration,
    });
};

module.exports = { generateToken };