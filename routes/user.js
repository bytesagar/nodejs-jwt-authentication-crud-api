const express = require('express')
const { check } = require('express-validator')

const userController = require('../controllers/user')

const router = express.Router()

router.post(
  '/signup',
  [
    check('username', 'Please enter a valid username').notEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid email').isLength({ min: 6 }),
  ],
  userController.signUp
)

router.post(
  '/login',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({ min: 6 }),
  ],
  userController.login
)

module.exports = router
