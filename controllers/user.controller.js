const db = require('../models')
const env = require('dotenv/config')
const User = db.user

exports.authContent = (req, res) => {
  res
    .status(200)
    .send('You have access, now you can go to Home page')
    .catch((err) => res.status(500).send({ message: err.message }))
}
