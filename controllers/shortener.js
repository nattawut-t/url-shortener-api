const Boom = require('boom')
const Url = require('../models/url')()
const { encode, decode, from, to } = require('../libs/base58')

const shorten = async (request, reply) => {
  const { payload: { url } } = request

  console.log(url)

  try {
    let id = 0
    const existing = await Url
      .findOne({ url })
      .select({
        id: 1,
      })
      .exec()

    if (!existing) {
      const _url = new Url()
      _url.url = url
      await _url.save()

      id = _url.id
    } else {
      id = existing.id
    }

    id = to(id)

    return reply({ url: id })
  } catch (error) {
    console.log('shorten.error: ', error)
    return reply(Boom.wrap(new Error('Internal Server Error'), 500))
  }
}

const getUrl = async (request, reply) => {
  const { key } = request.params

  try {
    let id = from(key)

    const existing = await Url
      .findOne({ id })
      .select({ url: 1 })
      .exec()

    return reply({ url: existing ? existing.url : '' })
  } catch (error) {
    console.log('shorten.error: ', error)
    return reply(Boom.wrap(new Error('Internal Server Error'), 500))
  }
}

module.exports = {
  shorten,
  getUrl,
}
