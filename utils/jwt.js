const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET || 'secretkey'

const createToken = payload => {
  return jwt.sign(payload, jwtSecret)
}

const verifyToken = token => {
  return jwt.verify(token, jwtSecret)
}

module.exports = { createToken, verifyToken }
