const { DataTypes } = require('sequelize')

module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define(
    'employees',
    {
      // id: {
      //   type: Sequelize.UUID,
      //   defaultValue: Sequelize.UUIDV4,
      // },
      employeeId: {
        type: Sequelize.STRING,
      },
      employeeName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      // org structure
      level1: {
        type: Sequelize.STRING,
      },
      level2: {
        type: Sequelize.STRING,
      },
      level3: {
        type: Sequelize.STRING,
      },
      level4: {
        type: Sequelize.STRING,
      },
      level5: {
        type: Sequelize.STRING,
      },
      startDate: {
        type: Sequelize.DATEONLY,
      },
      positionEntryDate: {
        type: Sequelize.DATEONLY,
      },
      positionTitle: {
        type: Sequelize.STRING,
      },
      directManager: {
        type: Sequelize.STRING,
      },
      levelFromCeo: {
        type: Sequelize.STRING,
      },
      // boolean
      hasBonus: {
        type: Sequelize.STRING,
      },
      isManager: {
        type: Sequelize.STRING,
      },
      // self review
      selfEvaluation: {
        type: Sequelize.STRING,
      },
      selfEvaluationPrevious: {
        type: Sequelize.STRING,
      },
      // manager review
      managerEvaluation: {
        type: Sequelize.STRING,
      },
      managerEvaluationComment: {
        type: Sequelize.STRING,
      },
      calibration: {
        type: Sequelize.STRING,
      },
      calibrationComment: {
        type: Sequelize.STRING,
      },
      // feedback
      feedbackPeer: {
        type: Sequelize.STRING,
      },
      feedbackProjectsAndTasks: {
        type: Sequelize.STRING,
      },
      feedbackCooperation: {
        type: Sequelize.STRING,
      },
      feedbackComment: {
        type: Sequelize.STRING,
      },
      // bonus
      targetBonusSum: {
        type: Sequelize.INTEGER,
      },
      targetBonusBudget: {
        type: Sequelize.INTEGER,
      },
      // technical
      lastModifiedOn: {
        type: Sequelize.DATEONLY,
      },
      lastModifiedBy: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
      paranoid: true,
    }
  )

  return Employee
}
