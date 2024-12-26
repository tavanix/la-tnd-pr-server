const db = require('../models')
const env = require('dotenv/config')
const Employee = db.employee

const { Op } = require('sequelize')

exports.employees = async (req, res) => {
  const filter = req.query

  const employee = await Employee.findAll({
    where: {
      [Op.and]: [filter],
    },
  })

  res.status(200).json(employee)
}

exports.updateEmployee = (req, res) => {
  Employee.update(
    {
      positionTitle: req.body.positionTitle,
      opsType: req.body.opsType,
      legalEntity: req.body.legalEntity,
      level1: req.body.level1,
      level2: req.body.level2,
      costCenter: req.body.costCenter,
      vacancyStatus: req.body.vacancyStatus,
    },
    { where: { employeeId: req.body.employeeId } }
  )
    .then(() => res.status(200).json('Оценка успешно обновлена!'))
    .catch((err) => res.status(500).send({ message: err.message }))
}
