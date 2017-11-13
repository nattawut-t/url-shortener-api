const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
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
      url: {
        type: String,
        required: true,
        unique: true,
      },
    },
    {
      timestamps: true
    })
  schema.plugin(AutoIncrement, { inc_field: 'id' })
  return schema
}

module.exports = Url
