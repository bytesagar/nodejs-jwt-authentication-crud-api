const express = require('express')

const connectToDatabase = require('./database/dbConfig')
const user = require('./routes/user')
const tutorial = require('./routes/tutorial')
const errorMiddleware = require('./middlewares/error')

const app = express()

//express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
  res.status(400).send('Api working')
})

app.use('/user', user)
app.use('/tutorial', tutorial)

app.use(errorMiddleware)

const PORT = process.env.PORT || 3000

connectToDatabase().then(_ => {
  app.listen(PORT, _ => {
    console.log(`Server started on port ${PORT}`)
  })
})
