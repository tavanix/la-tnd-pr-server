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
    name: 'tnd',
  })

  Role.create({
    id: 2,
    name: 'hrbp_hr',
  })

  Role.create({
    id: 3,
    name: 'hrbp_it',
  })
}
