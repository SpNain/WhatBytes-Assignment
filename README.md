# 🏥 WhatBytes Assignment

A robust, secure, and scalable backend system for managing healthcare operations including users, patients, doctors, and patient-doctor mappings.

---

## 🚀 Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MySQL (via Sequelize ORM)
* **Authentication**: JWT (JSON Web Token)
* **Validation & Error Handling**: Centralized using custom middleware
* **API Testing**: Postman (with shared documentation)
* **Environment Management**: dotenv

---

## 📁 Folder Structure

```
.
├── config/                   # DB configuration
├── controllers/              # Route logic
├── middlewares/              # Error handling, async wrapper, auth
├── models/                   # Sequelize models
├── routes/                   # Route definitions
├── utils/                    # Custom error classes
├── postman/                  # Postman collection file
│   └── WhatBytes_Assignment.postman_collection.json
├── app.js                    # App entrypoint
├── .env                      # Environment variables (not committed)
├── .env.example              # Sample environment config
└── README.md                 # You're here
```

---

## ✅ Features

### 🔐 Authentication

* Register and login with JWT
* Secure all protected routes

### 👩‍⚕️ Patients

* CRUD operations for patients (auth required)

### 🧑‍⚕️ Doctors

* Public access to list all doctors
* CRUD for logged-in users' doctors

### 🤩 Patient-Doctor Mapping

* Assign doctor(s) to patient
* View doctors mapped to a patient
* Remove mappings

---

## 📦 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/SpNain/WhatBytes-Assignment.git
cd WhatBytes-Assignment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root using provided `.env.example` file:

```env
PORT=3000
DB_NAME=
DB_USER=
DB_HOST=
DB_PASSWORD=
JWT_SECRET=

NODE_ENV=
```

### 4. Initialize DB

Make sure MySQL is running and then:

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate   # (if using migrations)
```

Or let Sequelize sync directly if you've configured it that way.

### 5. Run the server

```bash
npm start
```

---

## 📬 API Documentation

Full API docs with examples available via Postman:

👉 [View Documentation](https://documenter.getpostman.com/view/45807552/2sB2x9kWhx)

You can also import the Postman collection manually from the project:

```
postman/WhatBytes_Assignment.postman_collection.json
```

---

## 🧪 Postman Setup Guide

To run the collection successfully:

### Environment Variables to Define in Postman

* `baseUrl` = `http://localhost:3000`
* `token` = Set after successful login (value of JWT)

### How to Use:

1. Login with your test user via `/api/auth/login`
2. Copy the `token` from the response
3. Set it in the Postman environment variable `token`
4. All protected routes use `Authorization: Bearer {{token}}`

You can now run requests against:

```
{{baseUrl}}/api/patients
{{baseUrl}}/api/doctors
{{baseUrl}}/api/mappings
```

---

## 🛡 Security & Best Practices

* JWT stored and used via headers only
* Passwords hashed with `bcryptjs`
* Sensitive config via `.env` file
* Global async error handling middleware
* Sequelize ORM for SQL injection safety
* Authorization applied to sensitive routes only

---

## ✅ Completed Endpoints

### Auth Routes

* `POST /api/auth/register`
* `POST /api/auth/login`

### Patient Routes

* `POST /api/patients`
* `GET /api/patients`
* `GET /api/patients/:id`
* `PUT /api/patients/:id`
* `DELETE /api/patients/:id`

### Doctor Routes

* `POST /api/doctors`
* `GET /api/doctors`
* `GET /api/doctors/:id`
* `PUT /api/doctors/:id`
* `DELETE /api/doctors/:id`

### Mapping Routes

* `POST /api/mappings`
* `GET /api/mappings`
* `GET /api/mappings/:patientId`
* `DELETE /api/mappings/:id`

---