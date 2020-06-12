const User = require('../models/userModel')

const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const { createToken } = require('../utils/jwt')
const CustomError = require('../models/CustomError')

const signUp = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    })
  }

  const { username, email, password } = req.body
  try {
    let user = await User.findOne({ email: email })
    if (user) return next(new CustomError('User already exists', 400))
    user = new User({
      username,
      email,
      password,
    })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    user.password = hashedPassword

    await user.save()

    res.status(201).json({ success: true, user })
  } catch (err) {
    next(new CustomError('Something went wrong', 500))
  }
}

const login = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    })
  }
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })

    if (!user) return next(new CustomError('Invalid credentials', 400))

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      const accessToken = createToken({
        id: user._id,
        isAdmin: user.isAdmin,
      })

      res
        .header('auth-token', accessToken)
        .send({ success: true, accessToken, user })
    } else {
      return next(new CustomError(`Invalid credentials`, 400))
    }
  } catch (err) {
    console.log(err)
    next(new CustomError('Something went wrong', 500))
  }
}

module.exports = { signUp, login }
