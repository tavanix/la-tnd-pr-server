module.exports = (sequelize, Sequelize) => {
  const Calibration = sequelize.define('calibration', {
    level1: { type: Sequelize.STRING, allowNull: false, unique: true },
    approvedBy: { type: Sequelize.STRING, allowNull: false },
  })

  return Calibration
}
