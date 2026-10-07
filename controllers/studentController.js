const prisma = require("../config/database");

const createStudent = async (req, res) => {
    try {
        const { firstName, lastName, email, age, course } = req.body;

        if (!firstName || !lastName || !email || !age || !course) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingStudent = await prisma.student.findUnique({
            where: {
                email: email
            }
        });

        if (existingStudent) {
            return res.status(409).json({
                message: "Student with this email already exists"
            });
        }

        const student = await prisma.student.create({
            data: {
                firstName,
                lastName,
                email,
                age: Number(age),
                course
            }
        });

        res.status(201).json({
            message: "Student created successfully",
            student
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getStudents = async (req, res) => {
    try {
        const students = await prisma.student.findMany();

        res.status(200).json({
            count: students.length,
            students
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getStudentById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid student ID"
            });
        }

        const student = await prisma.student.findUnique({
            where: {
                id: id
            }
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            student
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const updateStudent = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid student ID"
            });
        }

        const existingStudent = await prisma.student.findUnique({
            where: {
                id: id
            }
        });

        if (!existingStudent) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const {
            firstName,
            lastName,
            email,
            age,
            course
        } = req.body;

        if (email && email !== existingStudent.email) {

            const emailExists = await prisma.student.findUnique({
                where: {
                    email: email
                }
            });

            if (emailExists) {
                return res.status(409).json({
                    message: "Email already belongs to another student"
                });
            }
        }

        const student = await prisma.student.update({
            where: {
                id: id
            },

            data: {
                ...(firstName !== undefined && { firstName }),
                ...(lastName !== undefined && { lastName }),
                ...(email !== undefined && { email }),
                ...(age !== undefined && { age: Number(age) }),
                ...(course !== undefined && { course })
            }
        });

        res.status(200).json({
            message: "Student updated successfully",
            student
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const deleteStudent = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid student ID"
            });
        }

        const existingStudent = await prisma.student.findUnique({
            where: {
                id: id
            }
        });

        if (!existingStudent) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        await prisma.student.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({
            message: "Student deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};