const config = require('../config/db.config.js')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./user.model.js')(sequelize, Sequelize)
db.role = require('./role.model.js')(sequelize, Sequelize)
db.employee = require('./employee.model.js')(sequelize, Sequelize)
db.calibration = require('./calibration.model.js')(sequelize, Sequelize)

db.role.belongsToMany(db.user, {
  through: 'user_roles',
})

db.user.belongsToMany(db.role, {
  through: 'user_roles',
})

db.ROLES = ['admin', 'cnb', 'tnd', 'hrbp_hr', 'hrbp_it']

module.exports = db
