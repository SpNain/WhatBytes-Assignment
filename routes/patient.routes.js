const express = require('express');
const {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
} = require('../controllers/patient.controller');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', auth, createPatient);
router.get('/', auth, getAllPatients);
router.get('/:id', auth, getPatientById);
router.put('/:id', auth, updatePatient);
router.delete('/:id', auth, deletePatient);

module.exports = router;
