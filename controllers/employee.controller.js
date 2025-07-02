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

exports.singleEmployee = async (req, res) => {
  const employee = await Employee.findAll({
    where: { email: req.body.email },
  })
  res.status(200).json(employee)
}

exports.updateEmployee = (req, res) => {
  Employee.update(
    {
      calibration: req.body.calibration,
      calibrationComment: req.body.calibrationComment,
      lastModifiedBy: req.body.lastModifiedBy,
      lastModifiedOn: req.body.lastModifiedOn,
    },
    { where: { email: req.body.email } }
  )
    .then(() => res.status(200).json('Оценка успешно обновлена!'))
    .catch((err) => res.status(500).send({ message: err.message }))
}

exports.employeesBulk = async (req, res) => {
  try {
    const employees = req.body

    if (!Array.isArray(employees)) {
      return res.status(400).json({ message: 'Invalid data format' })
    }

    // TODO: добавить валидацию данных
    const created = await Employee.bulkCreate(employees, {
      updateOnDuplicate: ['email'], // если email уникален
    })

    res.status(201).json({
      message: 'Employees uploaded successfully',
      count: created.length,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error uploading employees' })
  }
}
