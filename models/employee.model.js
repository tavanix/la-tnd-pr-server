const { DataTypes } = require('sequelize')
const { encrypt, decrypt } = require('../utils/encryption')

module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define(
    'employees',
    {
      employeeId: {
        // Табельный номер
        type: Sequelize.STRING,
        // encryption
        set(value) {
          this.setDataValue('employeeId', encrypt(value))
        },
        get() {
          const raw = this.getDataValue('employeeId')
          return raw ? decrypt(raw) : null
        },
      },
      employeeName: {
        // Сотрудник
        type: Sequelize.STRING,
        // encryption
        set(value) {
          this.setDataValue('employeeName', encrypt(value))
        },
        get() {
          const raw = this.getDataValue('employeeName')
          return raw ? decrypt(raw) : null
        },
      },
      email: {
        // Email
        type: Sequelize.STRING,
        primaryKey: true,
        // encryption
        set(value) {
          this.setDataValue('email', encrypt(value))
        },
        get() {
          const raw = this.getDataValue('email')
          return raw ? decrypt(raw) : null
        },
      },
      level1: {
        // Подразделение уровень 1
        type: Sequelize.STRING,
      },
      level2: {
        // Подразделение уровень 2
        type: Sequelize.STRING,
      },
      level3: {
        // Подразделение уровень 3
        type: Sequelize.STRING,
      },
      level4: {
        // Подразделение уровень 4
        type: Sequelize.STRING,
      },
      level5: {
        // Подразделение уровень 5
        type: Sequelize.STRING,
      },
      positionTitle: {
        // Должность
        type: Sequelize.STRING,
        // encryption
        set(value) {
          this.setDataValue('positionTitle', encrypt(value))
        },
        get() {
          const raw = this.getDataValue('positionTitle')
          return raw ? decrypt(raw) : null
        },
      },
      directManager: {
        // Руководитель
        type: Sequelize.STRING,
        // encryption
        set(value) {
          this.setDataValue('directManager', encrypt(value))
        },
        get() {
          const raw = this.getDataValue('directManager')
          return raw ? decrypt(raw) : null
        },
      },
      startDate: {
        // Дата приема _adj
        type: Sequelize.DATEONLY,
      },
      positionEntryDate: {
        // Дата вступления в текущую должность _adj
        type: Sequelize.DATEONLY,
      },
      hasBonus: {
        // Bonus
        type: Sequelize.STRING,
      },
      levelFromCeo: {
        // Level from CEO
        type: Sequelize.STRING,
      },
      isManager: {
        // Is Manager
        type: Sequelize.STRING,
      },
      target: {
        // Цель
        type: Sequelize.STRING,
      },
      areTargetsSetOnSelfReview: {
        // Цели поставлены только в самооценку
        type: Sequelize.STRING,
      },
      selfEvaluation: {
        // Результат самооценки
        type: Sequelize.STRING,
      },
      selfEvaluationComment: {
        // Комментарий к самооценке
        type: Sequelize.STRING,
      },
      managerEvaluation: {
        // Оценка руководителя
        type: Sequelize.STRING,
      },
      managerEvaluationComment: {
        // Комментарии к оценке руководителя
        type: Sequelize.STRING,
      },
      calibration: {
        // Изменение оценки на калибровке
        type: Sequelize.STRING,
      },
      calibrationComment: {
        // Комментарий к изменению оценки
        type: Sequelize.STRING,
      },
      managerEvaluationPrevious: {
        // Оценка руководителя H2 2024
        type: Sequelize.STRING,
      },
      targetBonusSum: {
        // Target bonus sum
        type: Sequelize.STRING,
        set(value) {
          this.setDataValue('targetBonusSum', encrypt(value))
        },
        get() {
          const raw = this.getDataValue('targetBonusSum')
          return raw ? decrypt(raw) : null
        },
      },
      targetBonusBudget: {
        // Budget bonus sum
        type: Sequelize.STRING,
        set(value) {
          this.setDataValue('targetBonusBudget', encrypt(value))
        },
        get() {
          const raw = this.getDataValue('targetBonusBudget')
          return raw ? decrypt(raw) : null
        },
      },

      lastModifiedBy: {
        type: Sequelize.STRING,
      },
      lastModifiedOn: {
        type: Sequelize.DATEONLY,
      },
    },
    {
      timestamps: false,
      paranoid: true,
    }
  )

  return Employee
}
