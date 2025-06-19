const Doctor = require("../models/doctor");
const asyncHandler = require("../middlewares/asyncHandler");
const CustomError = require("../utils/customError");

exports.createDoctor = asyncHandler(async (req, res) => {
  const { name, specialization } = req.body;

  if (!name || !specialization) {
    throw new CustomError("Name and specialization are required", 400);
  }

  const doctor = await Doctor.create({
    name,
    specialization,
    userId: req.user.userId,
  });

  res.status(201).json({ message: "Doctor created", doctor });
});

exports.getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.findAll();
  res.json({ doctors });
});

exports.getDoctorById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const doctor = await Doctor.findByPk(id);
  if (!doctor) throw new CustomError("Doctor not found", 404);

  res.json({ doctor });
});

exports.updateDoctor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, specialization } = req.body;

  const doctor = await Doctor.findOne({
    where: { id, userId: req.user.userId },
  });
  if (!doctor) throw new CustomError("Doctor not found or unauthorized", 404);

  doctor.name = name || doctor.name;
  doctor.specialization = specialization || doctor.specialization;

  await doctor.save();

  res.json({ message: "Doctor updated", doctor });
});

exports.deleteDoctor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const doctor = await Doctor.findOne({
    where: { id, userId: req.user.userId },
  });
  if (!doctor) throw new CustomError("Doctor not found or unauthorized", 404);

  await doctor.destroy();

  res.json({ message: "Doctor deleted" });
});
