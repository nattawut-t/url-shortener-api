const config = {
  port: 3001,
  host: '0.0.0.0',
  secretKey: process.env.JWT_SECRET || '',
}

module.exports = config
