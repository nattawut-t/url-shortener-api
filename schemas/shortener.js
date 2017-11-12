const Joi = require('joi')

const shortenPayload = Joi.object({
  url: Joi
    .string()
    .required()
    .description('url'),
})

const getUrlParams = Joi.string()

module.exports = {
  shortenPayload,
  getUrlParams,
}
