const Boom = require('boom')
const Url = require('../models/url')()

const shorten = async (request, reply) => {
  const { payload: { url } } = request

  console.log(url)

  try {
    let shortUrl
    const existingUrl = await Url
      .findOne({ longUrl: url })
      .select({
        id: 1,
        shortUrl: 1,
      })
      .exec()

    console.log('existingUrl: ', existingUrl)

    if (!existingUrl) {
      const _url = new Url()
      _url.longUrl = url
      _url.shortUrl = shortUrl
      await _url.save()

      shortUrl = _url.id
    } else {
      shortUrl = existingUrl.id
    }

    return reply({ url: shortUrl })
  } catch (error) {
    console.log('shorten.error: ', error)
    return reply(Boom.wrap(new Error('Internal Server Error'), 500))
  }

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
