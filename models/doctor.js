const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

Doctor.belongsTo(User, { foreignKey: 'userId', as: 'creator' });

module.exports = Doctor;
