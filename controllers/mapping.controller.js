const Mapping = require('../models/patientDoctorMapping');
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');
const asyncHandler = require('../middlewares/asyncHandler');
const CustomError = require('../utils/customError');

// Assign doctor to patient
exports.assignDoctor = asyncHandler(async (req, res) => {
  const { patientId, doctorId } = req.body;

  if (!patientId || !doctorId) {
    throw new CustomError('Both patientId and doctorId are required', 400);
  }

  const patient = await Patient.findByPk(patientId);
  const doctor = await Doctor.findByPk(doctorId);

  if (!patient || !doctor) {
    throw new CustomError('Patient or Doctor not found', 404);
  }

  const mapping = await Mapping.create({ patientId, doctorId });
  res.status(201).json({ message: 'Doctor assigned to patient', mapping });
});

// Get all mappings
exports.getAllMappings = asyncHandler(async (req, res) => {
  const mappings = await Mapping.findAll({
    include: ['patient', 'doctor']
  });

  res.json({ mappings });
});

// Get all doctors assigned to a specific patient
exports.getMappingsByPatient = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  const patient = await Patient.findByPk(patientId);
  if (!patient) throw new CustomError('Patient not found', 404);

  const mappings = await Mapping.findAll({
    where: { patientId },
    include: ['doctor']
  });

  res.json({ patientId, doctors: mappings.map(m => m.doctor) });
});

// Remove doctor from patient
exports.removeMapping = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const mapping = await Mapping.findByPk(id);
  if (!mapping) throw new CustomError('Mapping not found', 404);

  await mapping.destroy();
  res.json({ message: 'Doctor unassigned from patient' });
});
