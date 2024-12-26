const { authJwt } = require('../middleware')
const controller = require('../controllers/user.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  // only logged in users
  app.get('/api/', [authJwt.verifyToken], controller.authContent)
  app.get(
    '/api/admin',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.authContent
  )
}
