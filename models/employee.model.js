const { DataTypes } = require('sequelize')

module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define(
    'employees',
    {
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
      positionTitle: {
        type: Sequelize.STRING,
      },
      directManager: {
        type: Sequelize.STRING,
      },
      startDate: {
        type: Sequelize.DATEONLY,
      },
      levelFromCeo: {
        type: Sequelize.STRING,
      },

      hasBonus: {
        type: Sequelize.STRING,
      },
      isManager: {
        type: Sequelize.STRING,
      },

      selfEvaluation: {
        type: Sequelize.STRING,
      },
      selfEvaluationPrevious: {
        type: Sequelize.STRING,
      },

      managerEvaluation: {
        type: Sequelize.STRING,
      },
      managerEvaluationComment: {
        type: Sequelize.STRING,
      },
      managerEvaluationCalibration: {
        type: Sequelize.STRING,
      },
      managerEvaluationCalibrationComment: {
        type: Sequelize.STRING,
      },

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

      targetBonusSum: {
        type: Sequelize.INTEGER,
      },
      targetBonusPercent: {
        type: Sequelize.INTEGER,
      },
      targetBonusBudget: {
        type: Sequelize.INTEGER,
      },

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
