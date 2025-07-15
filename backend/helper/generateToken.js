const jwt = require('jsonwebtoken');

const generateToken = (id, secretCode) => {
    return jwt.sign({ id }, secretCode, {
        expiresIn: '30d',
    });
};

module.exports = { generateToken };