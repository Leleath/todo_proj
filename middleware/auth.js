// const jwt = require('jsonwebtoken');
require('dotenv').config();

const crypto = require('crypto');
const TOKENKEY = process.env.TOKENKEY;

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    let tokenParts = req.headers.authorization
      // .split(" ")[1]
      .split('.')
    let signature = crypto
      .createHmac('SHA256', TOKENKEY)
      .update(`${tokenParts[0]}.${tokenParts[1]}`)
      .digest('base64');

    if (signature === tokenParts[2]) {
        req.user = JSON.parse(
          Buffer.from(tokenParts[1], 'base64').toString('utf8')
        );
        next();
    } else {
      return res.status(400).json({message: "Invalid token"});
    }
  } else {
    return res.status(400).json({message: "Not authorized"});
  }
}