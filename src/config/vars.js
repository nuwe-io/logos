const path = require('path')

// import .env variables
require('dotenv-safe').config({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example')
})

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: { uri: process.env.ATLAS_URI },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  aws: {
    bucket: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_BUCKET_REGION,
    key: process.env.AWS_BUCKET_ACCESS_KEY,
    secret: process.env.AWS_BUCKET_SECRET_KEY
  }
}
