const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('DB Connected');
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error('Unable to connect to DB:', err);
  }
});
