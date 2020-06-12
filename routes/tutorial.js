const express = require('express')

const auth = require('../middlewares/auth')
const tutorialController = require('../controllers/tutorial')
const { check } = require('express-validator')

const router = express.Router()


router.get('/', tutorialController.findAll)


router.post(
    '/new',
    auth,
    [
        check('title', 'Please fill out the field').notEmpty(),
        check('body', 'Please fill out the field').notEmpty()
    ],

    tutorialController.createTutorial
)

router.get('/:id', tutorialController.findOne)


router.post(
    '/edit/:id',
    auth,
    [
        check('title', 'Please fill out the field').notEmpty(),
        check('body', 'Please fill out the field').notEmpty()
    ],

    tutorialController.update
)

router.post('/delete/:id', auth, tutorialController.delete)

module.exports = router
