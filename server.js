require('dotenv').config()

const mongoose = require('mongoose')

const Hapi = require('hapi')
const Inert = require('inert')
const Vision = require('vision')
const Jwt2Auth = require('hapi-auth-jwt2')
const HapiSwagger = require('hapi-swagger')
const Fs = require('fs')
const _ = require('lodash')
const Boom = require('boom')

const Pack = require('./package')
const { port, host, secretKey, mongoUrl } = require('./configs')
const server = new Hapi.Server()

mongoose.Promise = require('bluebird')

server.connection({
  host,
  port,
})

const options = {
  info: {
    'title': Pack.name,
    'version': Pack.version,
  },
  basePath: '/api',
  documentationPath: '/',
  security: [],
  grouping: 'tags',
  securityDefinitions: {
    'jwt': {
      'type': 'apiKey',
      'name': 'Authorization',
      'in': 'header'
    }
  },
}

const validate = (decoded, request, callback) => {

  console.log('decoded: ', decoded)
  // const user = JSON.parse(decoded)
  // console.log(user)

  if (!decoded) {
    return callback(Boom.wrap(new Error('Unauthorized'), 401), false)
  }

  return callback(null, true)
}

server.register([
  Inert,
  Vision,
  Jwt2Auth,
  {
    'register': HapiSwagger,
    'options': options,
  }],
  () => {
    server.auth.strategy('jwt', 'jwt',
      {
        key: secretKey,
        validateFunc: validate,
        verifyOptions: { algorithms: ['HS256'] },
      })

    // server.auth.default('jwt')

    Fs.readdirSync('routes')
      .forEach(file => {

        _.each(require('./routes/' + file), route => {
          server.route(route)
        })

      })

    if (mongoose.connection.readyState === 0) {
      try {
        mongoose.connect(mongoUrl)
      } catch (error) {
        console.log('mongoose connect failed: ', error)
      }
    }

    server.start(err => {
      if (err) {
        console.log(err)
      }
      console.log('Server running at:', server.info.uri)
    })
  })

module.exports = server
