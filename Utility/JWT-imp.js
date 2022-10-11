const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, 'brucewayneisbatman', {
    expiresIn: "30d",
  });
};

module.exports = generateToken;