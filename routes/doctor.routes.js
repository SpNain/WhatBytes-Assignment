const express = require('express');
const {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctor.controller');

const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', auth, createDoctor);
router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);
router.put('/:id', auth, updateDoctor);
router.delete('/:id', auth, deleteDoctor);

module.exports = router;
