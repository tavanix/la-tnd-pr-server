const crypto = require('crypto')
const secret = process.env.ENCRYPTION_SECRET

const algorithm = 'aes-256-cbc'
const ivLength = 16

function encrypt(value) {
  const iv = crypto.randomBytes(ivLength)
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(secret, 'hex'),
    iv
  )
  let encrypted = cipher.update(String(value), 'utf8', 'hex') // число → строка
  encrypted += cipher.final('hex')
  return iv.toString('hex') + ':' + encrypted
}

function decrypt(encryptedValue) {
  const [ivHex, encryptedText] = encryptedValue.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secret, 'hex'),
    iv
  )
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return isNaN(decrypted) ? decrypted : Number(decrypted) // строка → число (если это число)
}

module.exports = { encrypt, decrypt }
