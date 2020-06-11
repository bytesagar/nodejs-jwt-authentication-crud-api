const express = require("express")
const router = express.Router()
const auth = require("../middlewares/auth")
const tutorialController = require("../controllers/tutorial")

router.get("/", tutorialController.findAll)
router.post("/new", auth, tutorialController.createTutorial)
router.get("/:id", tutorialController.findOne)
router.post("/edit/:id", auth, tutorialController.update)
router.post("/delete/:id", auth, tutorialController.delete)

module.exports = router