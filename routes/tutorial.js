const express = require('express')

const auth = require('../middlewares/auth')
const tutorialController = require('../controllers/tutorial')

const router = express.Router()

router.get('/', tutorialController.findAll)

// TODO: Use express-validator
router.post('/new', auth, tutorialController.createTutorial)

router.get('/:id', tutorialController.findOne)

// TODO: Use express-validator
router.post('/edit/:id', auth, tutorialController.update)

router.post('/delete/:id', auth, tutorialController.delete)

module.exports = router
