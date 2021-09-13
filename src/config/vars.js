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
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  aws: {
    bucket: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_BUCKET_REGION,
    key: process.env.AWS_BUCKET_ACCESS_KEY,
    secret: process.env.AWS_BUCKET_SECRET_KEY
  },
  emailConfig: {
    support: process.env.SUPPORT_EMAIL,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    username: process.env.EMAIL_USERNAME,
    clientId: process.env.EMAIL_CLIENT_ID,
    privateKey: process.env.EMAIL_SECRRET_KEY,
    resetURL: process.env.EMAIL_RESET_URL,
    password: process.env.EMAIL_PASSWORD
  }
}
