const Boom = require('boom')
const Url = require('../models/url')()

const shorten = async (request, reply) => {
  const { payload: { url } } = request

  console.log(url)

  try {
    let shortUrl
    const existingUrl = await Url
      .findOne({ url })
      .select({
        id: 1,
      })
      .exec()

    console.log('existingUrl: ', existingUrl)

    if (!existingUrl) {
      const _url = new Url()
      _url.url = url
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

const getUrl = async (request, reply) => {
  const { key } = request.params

  try {
    let shortUrl
    const existingUrl = await Url
      .findById(key)
      .select({ url: 1 })
      .exec()

    console.log('existingUrl: ', existingUrl)

    return reply({ url: existingUrl ? existingUrl.url : '' })
  } catch (error) {
    console.log('shorten.error: ', error)
    return reply(Boom.wrap(new Error('Internal Server Error'), 500))
  }
}

module.exports = {
  shorten,
  getUrl,
}
