const { verifyToken, isAdmin } = require('../middleware/authJwt')
const {
  getLevelsForApproval,
  approveLevel,
  declineLevel,
  getApprovedLevels,
} = require('../controllers/admin.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get(
    '/api/levels-for-approval',
    verifyToken,
    isAdmin,
    getLevelsForApproval
  )
  app.post('/api/approve-level', verifyToken, isAdmin, approveLevel)
  app.post('/api/decline-level', verifyToken, isAdmin, declineLevel)
  app.get('/api/approved-levels', verifyToken, getApprovedLevels)
}
