const express = require('express')
const { check } = require('express-validator')

const userController = require('../controllers/user')

const router = express.Router()

router.post(
  '/signup',
  [
    check('username', 'Please enter a valid username').trim().notEmpty(),
    check('email', 'Please enter a valid email').trim().isEmail(),
    check('password', 'Please enter a valid password')
      .trim()
      .isLength({ min: 6 }),
  ],
  userController.signUp
)

router.post(
  '/login',
  [
    check('email', 'Please enter a valid email').trim().isEmail(),
    check('password', 'Please enter a valid password')
      .trim()
      .isLength({ min: 6 }),
  ],
  userController.login
)

module.exports = router
