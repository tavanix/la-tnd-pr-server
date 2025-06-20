const { authJwt } = require('../middleware')
const controller = require('../controllers/employee.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get('/api/employees', authJwt.verifyToken, controller.employees)
  app.put('/api/updateEmployee', authJwt.verifyToken, controller.updateEmployee)
  app.post('/api/employees/bulk', authJwt.verifyToken, controller.employeesBulk)
}
