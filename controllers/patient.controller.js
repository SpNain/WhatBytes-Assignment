const Patient = require('../models/patient');
const asyncHandler = require('../middlewares/asyncHandler');
const CustomError = require('../utils/customError');

exports.createPatient = asyncHandler(async (req, res) => {
  const { name, age, disease } = req.body;

  if (!name || !age || !disease) {
    throw new CustomError('All fields are required', 400);
  }

  const patient = await Patient.create({
    name,
    age,
    disease,
    userId: req.user.userId
  });

  res.status(201).json({ message: 'Patient created', patient });
});

exports.getAllPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.findAll({ where: { userId: req.user.userId } });
  res.json({ patients });
});

exports.getPatientById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const patient = await Patient.findOne({
    where: { id, userId: req.user.userId }
  });

  if (!patient) {
    throw new CustomError('Patient not found', 404);
  }

  res.json({ patient });
});

exports.updatePatient = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, age, disease } = req.body;

  const patient = await Patient.findOne({ where: { id, userId: req.user.userId } });

  if (!patient) {
    throw new CustomError('Patient not found', 404);
  }

  patient.name = name || patient.name;
  patient.age = age || patient.age;
  patient.disease = disease || patient.disease;

  await patient.save();

  res.json({ message: 'Patient updated', patient });
});

exports.deletePatient = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const patient = await Patient.findOne({ where: { id, userId: req.user.userId } });
  if (!patient) {
    throw new CustomError('Patient not found', 404);
  }

  await patient.destroy();

  res.json({ message: 'Patient deleted' });
});
