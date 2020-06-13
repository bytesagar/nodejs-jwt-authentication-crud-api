const mongoose = require('mongoose')

const connOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/API_TEST'

const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(MONGO_URI, connOptions)
    if (connect) console.log(`Mongodb connected - ${connect.connection.host}`)
  } catch (err) {
    console.log(`Database error ${err}`)
  }
}


module.exports = connectToDB
