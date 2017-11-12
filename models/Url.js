const mongoose = require('mongoose')
let schema

function Url() {
  if (!schema) {
    schema = createSchema()
  }
  return mongoose.model('Url', schema)
}

const createSchema = () => {
  const Schema = mongoose.Schema
  const schema = new Schema(
    {
      longUrl: {
        type: String,
        required: true,
        unique: true,
      },
      shortUrl: {
        type: String,
        required: true,
        unique: true,
      },
    },
    {
      timestamps: true
    })

  return schema
}

module.exports = Url
