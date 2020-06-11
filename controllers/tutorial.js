const Tutorial = require("../models/tutorial")

exports.createTutorial = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "No place can be empty" })
    }
    try {
        const tutorial = new Tutorial({
            title: req.body.title,
            body: req.body.body
        })

        const tut = await tutorial.save()
        return res.status(200).send(tut)

    } catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }
}

exports.findAll = async (req, res) => {
    try {
        const tut = await Tutorial.find()

        return res.status(200).send(tut)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }

}

exports.findOne = async (req, res) => {
    try {
        const tut = await Tutorial.findById(req.params.id)

        if (!tut) {
            throw new Error("Tutorial not found")
        }
        res.send({ status: "success", payload: tut })
    } catch (err) {
        res.status(400).send(err)
    }
}

exports.update = async (req, res) => {
    try {
        const editTutorial = await Tutorial.findOneAndUpdate({ _id: req.params.id }, req.body)

        if (!editTutorial) {
            throw new Error("Tutorial not found")
        }
        const updatedTutorial = await Tutorial.findById(req.params.id)
        return res.status(200).send({ status: "Success", payload: updatedTutorial })
    } catch (err) {
        return res.status(400).send(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const tut = await Tutorial.findOneAndDelete({ _id: req.params.id })
        if (!tut) {
            return res.status(400).send("No tutorial found")
        }
        return res.status(200).send({ status: "Success", payload: tut, message: "Deleted" })
    } catch (err) {
        return res.status(400).send({ status: "Failed" })
    }
}

