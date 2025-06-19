const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patient');
const Doctor = require('./doctor');

const PatientDoctorMapping = sequelize.define('PatientDoctorMapping', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

PatientDoctorMapping.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
PatientDoctorMapping.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });

module.exports = PatientDoctorMapping;
