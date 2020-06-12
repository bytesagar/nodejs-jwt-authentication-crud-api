const { verifyToken } = require('../utils/jwt')
const User = require("../models/userModel")
const CustomError = require('../models/CustomError')

module.exports = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return next(
        new CustomError('Unauthorized access, provide the token', 400)
      )
    }

    let decoded;
    try {
      decoded = verifyToken(token);

    } catch (err) {
      return next(
        new CustomError('Unauthorized access, provide the token', 400)
      )
    }

    const user = await User.findById(decoded.id)

    if (!user) {
      return next(
        new CustomError("Unauthorized access", 400)
      )
    }

    req.uid = decoded.id
    next()

  } catch (err) {
    next(new CustomError('Something went wrong', 500))
  }
}
