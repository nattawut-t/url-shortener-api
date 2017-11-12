// const Boom = require('boom')

const shorten = (request, reply) => {
  const { payload: { url } } = request

  console.log(url)

  return reply({ url: 'mockurl' })
}

const getUrl = (request, reply) => {
  const { shortUrl } = request.params

  console.log(shortUrl)

  return reply({ url: shortUrl })
}

module.exports = {
  shorten,
  getUrl,
}
