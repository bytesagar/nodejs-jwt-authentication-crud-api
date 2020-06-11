const express = require("express")
const connectToDatabase = require("./database/dbConfig")
const user = require("./routes/user")
const tutorial = require("./routes/tutorial")
const app = express()
connectToDatabase()

//express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



app.get("/", (req, res) => {
    res.status(400).send("Api working")
})

app.use("/user", user)
app.use("/tutorial", tutorial)



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Server started")
})