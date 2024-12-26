const db = require('../models')
const env = require('dotenv/config')
const User = db.user
const Role = db.role

const Op = db.Sequelize.Op

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    employeeId: req.body.employeeId,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({
              message: 'User registered successfully!',
            })
          })
        })
      } else {
        // user role = 7 is Viewer by default
        user.setRoles([3]).then(() => {
          res.send({ message: 'User registered successfully!' })
        })
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}

exports.login = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found.' })
      }

      let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Username or Password!',
        })
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      })

      let authorities = []
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push('ROLE_' + roles[i].name.toUpperCase())
        }
        res
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .status(200)
          .send({
            id: user.id,
            employeeId: user.employeeId,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
          })
      })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}

exports.logout = (req, res) => {
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('User has been logged out.')
}

exports.updatePassword = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      user.update({
        password: bcrypt.hashSync(req.body.password, 8),
      })
    })
    .then(() => {
      res.send({
        message: 'Password updated successfully!',
      })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}
