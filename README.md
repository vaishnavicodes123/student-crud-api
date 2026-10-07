# Student CRUD API

A REST API for managing student records using Node.js, Express.js, PostgreSQL and Prisma ORM.

## Technologies

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Postman
- Git
- GitHub

## Features

- Create a student
- Get all students
- Get student by ID
- Update student details
- Delete a student
- Required field validation
- Student ID validation
- Duplicate email validation
- Error handling

## Project Structure

student-crud-api/
│
├── config/
│   └── database.js
├── controllers/
│   └── studentController.js
├── routes/
│   └── studentRoutes.js
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js

## Installation

Clone the repository and install the dependencies:

```bash
npm install