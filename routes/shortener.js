const { shorten, getUrl } = require('../controllers/shortener')
const { shortenPayload, getUrlParams } = require('../schemas/shortener')

module.exports = [
  {
    method: 'POST',
    path: '/api/url/shorten',
    config: {
      handler: shorten,
      description: 'Shorten URL',
      tags: ['api'],
      validate: {
        payload: shortenPayload,
      },
      cors: true,
    }
  },
  {
    method: 'GET',
    path: '/api/url/shorten/{id}',
    config: {
      handler: getUrl,
      description: 'Get mapped url from short URL',
      tags: ['api'],
      validate: {
        params: {
          id: getUrlParams,
        },
      },
      cors: true,
    }
  },
]
