var mongoose = require('mongoose')
require('dotenv').config()

const connectionString = process.env.ATLAS_URI

exports.connect = () => mongoose.connect(connectionString, {})

/**
 * Drop database, close the connection and stop mongod.
 */

exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
}

/**
 * Remove all the data for all db collections.
 */
exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    collection.deleteMany()
  }
}

exports.close = () => mongoose.disconnect()

// Loading the mongo db uri to a constat for easier access
mongoose
  .connect(connectionString, { useNewUrlParser: true })
  .then(() => console.log('Connection stabilished successfully'))
  .catch((err) => console.log(err))
