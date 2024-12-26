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
      calibration: req.body.calibration,
      calibrationComment: req.body.calibrationComment,
    },
    { where: { email: req.body.email } }
  )
    .then(() => res.status(200).json('Оценка успешно обновлена!'))
    .catch((err) => res.status(500).send({ message: err.message }))
}
