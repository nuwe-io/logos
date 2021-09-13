const { version } = require('../../package.json')

const options = {
  info: {
    version: version,
    title: 'NUWE Logos API',
    description: 'API simple que devuelve en formato png o svg los logos de tecnologías que encontramos en el sector tech',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT '
    },
    contact: {
      name: 'NUWE | Edgar Gago Carrillo',
      url: 'https://nuwe.io',
      email: 'hello@nuwe.io'
    }
  },
  /**
   *   security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic'
    }
  },
   */
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: '../../**/*.js',
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/v3/api-docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'NUWE Logos API'
  },
  // multiple option in case you want more that one instance
  multiple: true
}

module.exports = { options }
