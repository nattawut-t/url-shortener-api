const alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
const base = alphabet.length // base is the length of the alphabet (58 in this case)

// utility function to convert base 10 integer to base 58 string
const encode = value => {
  let _value = value
  let encoded = ''

  while (_value) {
    const remainder = _value % base
    _value = Math.floor(_value / base)
    encoded = alphabet[remainder].toString() + encoded
  }

  return encoded
}

// utility function to convert a base 58 string to base 10 integer
const decode = value => {
  let _value = value
  let decoded = 0

  while (_value) {
    const index = alphabet.indexOf(_value[0])
    const power = _value.length - 1
    decoded += index * (Math.pow(base, power))
    _value = _value.substring(1)
  }

  return decoded
}

// const from = value => {
//   let _value = decode(value)
//   return (_value -= 10000)
// }

// const to = value => encode(value += 10000)

module.exports = {
  encode,
  decode,
  // from,
  // to,
}