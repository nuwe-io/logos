const Email = require('email-templates')
const nodemailer = require('nodemailer')
const logger = require('../../../config/logger')
const { emailConfig } = require('../../../config/vars')

// SMTP is the main transport in Nodemailer for delivering messages.
// SMTP is also the protocol used between almost all email hosts, so its truly universal.
// if you dont want to use SMTP you can create your own transport here
// such as an email service API or nodemailer-sendgrid-transport
const transporter = nodemailer.createTransport({
  port: emailConfig.port,
  host: emailConfig.host,
  secure:true,
  auth: {
    type: 'OAuth2',
    user: emailConfig.username,
    serviceClient: emailConfig.clientId,
    privateKey: emailConfig.privateKey
  }
})

// Verify connection configuration
transporter.verify((error) => {
  if (error) {
    console.log('error with email connection')
  } else {
    logger.info('Gsuite connected')
  }
})

exports.sendPasswordReset = async (passwordResetObject) => {
  const email = new Email({
    views: { root: __dirname },
    message: {
      from: emailConfig.support
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: transporter
  })

  email
    .send({
      template: 'passwordReset',
      message: {
        to: passwordResetObject.userEmail
      },
      locals: {
        productName: 'Test App',
        // passwordResetUrl should be a URL to your app that displays a view where they
        // can enter a new password along with passing the resetToken in the params
        passwordResetUrl: `${emailConfig.resetURL}${passwordResetObject.resetToken}`
      }
    })
    .catch(() => console.log('error sending password reset email'))
}

exports.sendPasswordChangeEmail = async (user) => {
  const email = new Email({
    views: { root: __dirname },
    message: {
      from: emailConfig.support
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: transporter
  })

  email
    .send({
      template: 'passwordChange',
      message: {
        to: user.email
      },
      locals: {
        productName: 'Logos API',
        name: user.name
      }
    })
    .catch(() => console.log('error sending change password email'))
}
