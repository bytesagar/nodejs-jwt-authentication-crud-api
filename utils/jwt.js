const jwt = require("jsonwebtoken")
const Token = require("../models/tokenModel")

const createToken = async (payload, secret) => {
    const tok = jwt.sign(payload, secret)
    return tok
}

const verifyToken = async (token, secret) => {
    try {

        const decoded = jwt.verify(token, secret);
        return decoded
    } catch (err) {

        throw new Error(err)
    }
}

module.exports = { createToken, verifyToken }