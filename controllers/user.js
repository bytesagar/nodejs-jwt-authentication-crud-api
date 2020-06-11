const User = require("../models/userModel")

const bcrypt = require("bcrypt")
const { check, validationResult } = require("express-validator")
const { createToken, verifyToken } = require("../utils/jwt")

const signUp = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { username, email, password } = req.body
    try {
        let user = await User.findOne({ email: email })
        if (user) return res.status(400).json({ msg: "User already exists" })
        user = new User({
            username,
            email,
            password
        })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        user.password = hashedPassword

        await user.save()

        res.status(201).json({ success: true, payload: user })

    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: err })
    }

}
const login = async (req, res) => {
    const errors = validationResult(req)
    if ((!errors.isEmpty())) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })

        if (!user) res.status(400).json({
            message: "User does not exist"
        })

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const accessToken = await createToken({
                id: user._id,
                isAdmin: user.isAdmin
            }, process.env.JWT_SECRET || "secretkey")

            res.header('auth-token', accessToken).send({ status: 'success', accessToken, payload: user })
        } else {
            throw new Error("Email or password doesn't match")
        }

    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: "Something went wrong"
        })
    }
}



module.exports = { signUp, login }