const app = require('./app')
require('dotenv').config()

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`)
})

module.exports = server
