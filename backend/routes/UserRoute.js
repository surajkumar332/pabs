import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";
import Patient from "../models/PatientSchema.js";
import { allowRoles, verifyUser } from "../middleware/auth.js";

const userRoute = express.Router();


userRoute.post("/register", async (req, res) => {
    try {
        const { name, mobile, password } = req.body;

        if (!name || !mobile || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const userExists = await User.findOne({ mobile });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            mobile,
            password: hashedPassword,
            role: "patient"
        });

        const patient = await Patient.create({
            name,
            mobile,
            userId: user._id
        });

        res.status(201).json({
            message: "Patient registered successfully",
            role: user.role,
            user,
            patient
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});

userRoute.post("/create-owner", async (req, res) => {
    try {
        const { name, mobile, password } = req.body;

        if (!name || !mobile || !password) {
            return res.status(400).json({
                message: "All Fields are Required"
            });

        }

        const ownerExists = await User.findOne({
            role: "owner"
        });

        if (ownerExists) {
            return res.status(400).json({
                message: "Owner already Exists"
            });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const owner = await User.create({
            name,
            mobile,
            password: hashedpassword,
            role: "owner"
        });
        res.status(201).json({
            owner
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"

        });
    }
});


userRoute.post("/create-admin",
    verifyUser,
    allowRoles("owner"),
    async (req, res) => {
        try {
            const { name, mobile, password } = req.body;

            if (!name || !mobile || !password) {
                return res.status(400).json({
                    message: "All Fields are Required"
                });

            }

            const adminExists = await User.findOne({ mobile });

            if (adminExists) {
                return res.status(400).json({
                    message: "This admin Already Exists0"
                });
            }


            const hashedPassword = await bcrypt.hash(password, 10);

            const admin = await User.create({
                name,
                mobile,
                password: hashedPassword,
                role: "admin"
            });

            res.status(201).json({
                message: "Admin Created Successfully",
                admin
            });

        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);



userRoute.post("/login", async (req, res) => {
    try {
        const { mobile, password } = req.body;

        if (!mobile || !password) {
            return res.status(400).json({
                message: "Mobile & Password are Required"
            });
        }

        // Check new users collection first
        const user = await User.findOne({ mobile: String(mobile) });

        if (user) {
            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    message: "Wrong password"
                });
            }

            const token = jwt.sign(
                {
                    id: user._id,
                    role: user.role,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            return res.json({
                message: "Login Successfully",
                role: user.role,
                user,
                token
            });
        }

        // If not found in users, check old patients collection
        const patient = await Patient.findOne({
            mobile: Number(mobile)
        });

        if (!patient) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Old patient passwords are plain text
        if (patient.password !== password) {
            return res.status(401).json({
                message: "Wrong password"
            });
        }

        const token = jwt.sign(
            {
                id: patient._id,
                role: "patient"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.json({
            message: "Login Successfully",
            role: "patient",
            user: patient,
            token
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});


userRoute.get("/get-patient", async (req, res) => {
    try {
        const patient = await User.find({ role : "patient"});

res.status(200).json({
    message: "Patient Get Successfully",
    patient
});
    } catch (error) {
    console.log("error", error);

    res.status(500).json({
        message: "Server Error"
    });
}
});
export default userRoute;

