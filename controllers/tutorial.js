const Tutorial = require('../models/tutorial')
const User = require("../models/userModel")
const CustomError = require('../models/CustomError')


exports.createTutorial = async (req, res, next) => {
  if (!req.body) {
    return next(new CustomError('Body cannot be empty', 400))
  }
  try {
    const tutorial = await Tutorial.create({
      title: req.body.title,
      body: req.body.body,
      creator: req.uid
    })

    //connected tutorials with the user
    const user = await User.findById(req.uid)

    if (user) {

      const tutorials = [...user.tutorials, tutorial.id]
      await user.updateOne({ tutorials })

      return res.status(201).send({ success: true, tutorial: tutorials })

    }
  } catch (err) {
    console.log(err)
    next(new CustomError('Something went wrong', 500))
  }
}

exports.findAll = async (req, res, next) => {
  try {
    const tut = await Tutorial.find()

    return res.status(200).send({ success: true, tutorial: tut })
  } catch (err) {
    console.log(err)
    next(new CustomError('Something went wrong', 500))
  }
}

exports.findOne = async (req, res, next) => {
  try {
    const tut = await Tutorial.findById(req.params.id)

    if (!tut) {
      return next(new CustomError('Tutorial not found', 400))
    }
    res.send({ success: true, tutorial: tut })
  } catch (err) {
    next(new CustomError('Something went wrong', 500))
  }
}

exports.update = async (req, res, next) => {
  try {
    const editTutorial = await Tutorial.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    )

    if (!editTutorial) {
      return next(new CustomError('Tutorial not found', 400))
    }
    const updatedTutorial = await Tutorial.findById(req.params.id)
    return res.status(200).send({ success: true, tutorial: updatedTutorial })
  } catch (err) {
    next(new CustomError('Something went wrong', 500))
  }
}

exports.delete = async (req, res, next) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id)
    if (!tutorial) {
      return next(new CustomError('Tutorial not found', 400))
    }

    if (tutorial.creator != req.uid) {
      return next(
        new CustomError('Unauthorized access to delete route', 400)
      )
    }

    await Tutorial.findByIdAndDelete(req.params.id)
    const user = await User.findById(req.uid)

    if (user) {
      let tutorials = user.tutorials.filter(tutId => tutId != req.params.id)
      await user.updateOne({ tutorials })
    }

    return res.send({ success: true, tutorial: tut })
  } catch (err) {
    next(new CustomError('Something went wrong', 500))
  }
}
