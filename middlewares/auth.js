const { verifyToken } = require("../utils/jwt")

module.exports = async (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(400).send({ message: "Please provide token to view the resource" })

    try {
        const verified = await verifyToken(token, process.env.JWT_SECRET || 'secretkey')
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
    next()

}