import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoute from "./routes/UserRoute.js";
import appointmentRouter from "./routes/AppointmentRouter.js";
import doctorRoute from "./routes/DoctorRouter.js";
import cors from "cors";
import nodemailer from "nodemailer";


const app = express();

// for env
dotenv.config();

// DB Connect
connectDB();

// middleware
app.use(express.json());
// cros
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// routes
app.get("/", (req, res) => {
    res.send("api is running");
});
app.use("/images", express.static("../public/images"));
app.use("/users", userRoute);
app.use("/doctor", doctorRoute);
app.use("/appointment", appointmentRouter);


// notification(nodemailer)

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("Email Error:", err);
        } else {
            console.log("Email Sent:", info.response);
        }
    });
};
export { sendEmail };

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is Running ${PORT}`);
});

