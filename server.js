const express = require('express')
const cors = require('cors')
const env = require('dotenv/config')

const app = express()

let corsOptions = {
  origin: process.env.URL,
}

app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

const db = require('./models')
const Role = db.role

db.sequelize.sync()
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Database...')
//   initiateUserRoles()
// })

// routes
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)
require('./routes/employee.routes')(app)
require('./routes/admin.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

function initiateUserRoles() {
  Role.create({
    id: 0,
    name: 'admin',
  })

  Role.create({
    id: 1,
    name: 'cis_all',
  })

  Role.create({
    id: 2,
    name: 'cis_kz',
  })

  Role.create({
    id: 3,
    name: 'cis_by',
  })

  Role.create({
    id: 4,
    name: 'audit',
  })

  Role.create({
    id: 5,
    name: 'purchasing',
  })

  Role.create({
    id: 6,
    name: 'it',
  })

  Role.create({
    id: 7,
    name: 'corp_gov',
  })

  Role.create({
    id: 8,
    name: 'marketplace',
  })

  Role.create({
    id: 9,
    name: 'product',
  })

  Role.create({
    id: 10,
    name: 'retail',
  })

  Role.create({
    id: 11,
    name: 'strategy',
  })

  Role.create({
    id: 12,
    name: 'hr_admin',
  })

  Role.create({
    id: 13,
    name: 'finance',
  })

  Role.create({
    id: 14,
    name: 'marketing',
  })

  Role.create({
    id: 15,
    name: 'lfc',
  })

  Role.create({
    id: 16,
    name: 'ops_alypova',
  })

  Role.create({
    id: 17,
    name: 'ops_musina',
  })

  Role.create({
    id: 18,
    name: 'ops_adamovich',
  })

  Role.create({
    id: 19,
    name: 'all',
  })
}
