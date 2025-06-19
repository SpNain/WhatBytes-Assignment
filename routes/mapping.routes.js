const express = require('express');
const {
  assignDoctor,
  getAllMappings,
  getMappingsByPatient,
  removeMapping
} = require('../controllers/mapping.controller');

const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', auth, assignDoctor);
router.get('/', getAllMappings);
router.get('/:patientId', getMappingsByPatient);
router.delete('/:id', auth, removeMapping);

module.exports = router;
