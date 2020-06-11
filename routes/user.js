const express = require("express")
const { check, validationResult } = require("express-validator")
const router = express.Router()
const userController = require("../controllers/user")
router.get("/signup", (req, res) => {
    res.status(400).json({
        message: "This is signp router"
    })
})
router.post(
    "/signup",
    [
        check('username', "Please enter a valid username")
            .not()
            .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check('password', "Please enter a valid email").isLength({
            min: 6
        })
    ],
    userController.signUp
)

router.post(
    "/login",
    [
        check('email', "Please enter a valid email").isEmail(),
        check('password', "Please enter a valid password").isLength({
            min: 6
        })
    ],
    userController.login
)

module.exports = router