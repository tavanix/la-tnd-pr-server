const jwt = require('jsonwebtoken')
const env = require('dotenv/config')
const db = require('../models')
const User = db.user

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token']

  if (!token) {
    return res.status(401).send({
      message: 'No token provided! Please go to Login page',
    })
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      })
    }
    req.userId = decoded.id
    next()
  })
}

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          next()
          return
        }
      }

      res.status(403).send({
        message: 'Admin role is required to view this page!',
      })

      return
    })
  })
}

// isHrbp = (req, res, next) => {
//   User.findByPk(req.userId).then((user) => {
//     user.getRoles().then((roles) => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].name === 'hrbp' || roles[i].name === 'hrbphr') {
//           next()
//           return
//         }
//       }
//       res.status(403).send({
//         message: 'HRBP role is required to view this page!',
//       })
//     })
//   })
// }

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  // isHrbp: isHrbp,
}

module.exports = authJwt
