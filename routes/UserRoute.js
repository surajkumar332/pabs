// import express from "express";
// import Patient from "../models/PatientSchema.js";
// import Doctor from "../models/DoctorSchema.js";
// import jwt from "jsonwebtoken";

// const userRoute = express.Router();

// // register
// userRoute.post("/register", async (req, res) => {
//     try {
//         const { name, mobile, password } = req.body;
//         const patientExists = await Patient.findOne({ mobile });
//         const doctorExists = await Doctor.findOne({ mobile });

//         if (patientExists || doctorExists) {
//             return res.status(400).json({ message: "already exists" });
//         }

//         let user;
//         user = await Patient.create({ name, mobile, password });
//         await user.save();

//         res.status(201).json({
//             message: "User Registered Successfully",
//             user
//         });

//     } catch (error) {
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// userRoute.post("/login", async (req, res) => {
//     try {
//         const { mobile, password, name } = req.body;
//         console.log(mobile, password, name)

       
//         if (name === "admin" && password === "admin123") {
//             const token = jwt.sign(
//                 { name: "admin", role: "admin" },
//                 "secretkey123",
//                 { expiresIn: "1d" }
//             );

//             return res.json({
//                 message: "Admin Login Successfully",
//                 role: "admin",
//                 user: { name: "admin" },
//                 token
//             });
//         }

        
//         if (mobile && password) {
//             const patient = await Patient.findOne({ mobile });

//             if (!patient) {
//                 return res.status(404).json({ message: "User not found" });
//             }

//             if (patient.password !== password) {
//                 return res.status(401).json({ message: "Wrong password" });
//             }

//             const token = jwt.sign(
//                 { id: patient._id, role: "patient" },
//                 "secretkey123",
//                 { expiresIn: "1d" }
//             );

//             return res.json({
//                 message: "Login success",
//                 role: "patient",
//                 user: patient,
//                 token
//             });

//         }
//             return res.status(400).json({ message: "Invalid data" });

//         } catch (error) {
//             console.log(error);
//             res.status(500).json({ message: "Server Error" });
//         }
//     });

// export default userRoute;  

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";
import Organization from "../models/OrganizationSchema.js";

const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
    try {
        const { name, mobile, password, organizationName } = req.body;

        if (!name || !mobile || !password || !organizationName) {
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
            role: "owner"
        });

        const organization = await Organization.create({
            name: organizationName,
            createdBy: user._id
        });

        user.organizationId = organization._id;
        await user.save();

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                organizationId: organization._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(201).json({
            message: "Organization registered successfully",
            role: user.role,
            user,
            organization,
            token
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});



userRoute.post("/login", async(req,res) => {

    try{
        const {mobile, password} = req.body;

        if(!mobile && !password){
            return res.status(400).json({
                message: "Mobile & Password are Required"
            });
        }
        const user = await User.findOne({mobile});

        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!passwordMatch){
            return res.status(401).json({
                message: "wrong password"
            });
        }
        const token = jwt.sign({
            id : user._id,
            role: user.role,
            organizationId: user.organizationId
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );
    res.json({
        message: "Loing Successfully",
        role: user.role,
        user, 
        token
    });

    }

    catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});

export default userRoute;
