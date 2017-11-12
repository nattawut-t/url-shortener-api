const config = {
  port: 3001,
  host: '0.0.0.0',
  secretKey: process.env.JWT_SECRET || '',
  mongoUrl: process.env.MONGO_URL || '',
}

module.exports = config
