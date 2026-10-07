const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const studentRoutes = require("./routes/studentRoutes");



const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.json({
        message: "Student Management API is running"
    });
});

app.use("/api/students", studentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});