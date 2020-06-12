const { verifyToken } = require('../utils/jwt')
const CustomError = require('../models/CustomError')

module.exports = async (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) return next(new CustomError('Invalid token', 400))

  try {
    const verified = verifyToken(token)

    // TODO: req.userId = ...

    next()
  } catch (err) {
    return new CustomError('Invalid token', 500)
  }
}
