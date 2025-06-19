const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');

const User = require('./models/user');
const Patient = require('./models/patient');
const Doctor = require('./models/doctor');
const PatientDoctorMapping = require('./models/patientDoctorMapping');

const authRoutes = require('./routes/auth.routes');
const patientRoutes = require('./routes/patient.routes');
const doctorRoutes = require('./routes/doctor.routes');
const mappingRoutes = require('./routes/mapping.routes');

const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/mappings', mappingRoutes);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('DB Connected');
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error('Unable to connect to DB:', err);
  }
});
