const { where } = require('sequelize')
const db = require('../models')

// Получение уникальных Level1, которые ещё не согласованы
exports.getLevelsForApproval = async (req, res) => {
  const all = await db.employee.findAll({
    attributes: ['level1'],
    group: 'level1',
  })
  const approved = await db.calibration.findAll({ attributes: ['level1'] })

  const approvedSet = new Set(approved.map((a) => a.level1))
  const toApprove = all
    .map((e) => e.level1)
    .filter((lvl) => !approvedSet.has(lvl))

  res.json(toApprove)
}

// Маркировка Level1 как согласованного
exports.approveLevel = async (req, res) => {
  const { level1 } = req.body
  await db.calibration.create({ level1, approvedBy: req.body.user.username })
  res.status(200).json({ message: 'Approved' })
}

exports.declineLevel = async (req, res) => {
  const { level1 } = req.body
  await db.calibration.destroy({ where: { level1 } })
  res.status(200).json({ message: 'Declined' })
}

exports.getApprovedLevels = async (req, res) => {
  const all = await db.employee.findAll({
    attributes: ['level1'],
    group: 'level1',
  })
  const approved = await db.calibration.findAll({ attributes: ['level1'] })

  res.json(approved)
}
