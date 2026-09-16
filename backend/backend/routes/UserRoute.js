import express from "express";
import Patient from "../models/PatientSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";

const userRoute = express.Router();

// register
userRoute.post("/register", async (req, res) => {
    try {
        const { name, mobile, password } = req.body;
        const patientExists = await Patient.findOne({ mobile });
        const doctorExists = await Doctor.findOne({ mobile });

        if (patientExists || doctorExists) {
            return res.status(400).json({ message: "Mobile already exists" });
        }

        let user;
        user = await Patient.create({ name, mobile, password });
        await user.save();

        res.status(201).json({
            message: "User Registered Successfully",
            user
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

userRoute.post("/login", async (req, res) => {
    try {
        const { mobile, password, name } = req.body;
        console.log(mobile, password, name)

       
        if (name === "admin" && password === "admin123") {
            const token = jwt.sign(
                { name: "admin", role: "admin" },
                "secretkey123",
                { expiresIn: "1d" }
            );

            return res.json({
                message: "Admin Login Successfully",
                role: "admin",
                user: { name: "admin" },
                token
            });
        }

        
        if (mobile && password) {
            const patient = await Patient.findOne({ mobile });

            if (!patient) {
                return res.status(404).json({ message: "User not found" });
            }

            if (patient.password !== password) {
                return res.status(401).json({ message: "Wrong password" });
            }

            const token = jwt.sign(
                { id: patient._id, role: "patient" },
                "secretkey123",
                { expiresIn: "1d" }
            );

            return res.json({
                message: "Login success",
                role: "patient",
                user: patient,
                token
            });

        }
            return res.status(400).json({ message: "Invalid data" });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server Error" });
        }
    });

export default userRoute;