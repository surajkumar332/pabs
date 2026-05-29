import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoute from "./routes/UserRoute.js";
import appointmentRouter from "./routes/AppointmentRouter.js";
import doctorRoute from "./routes/DoctorRouter.js";
import cors from "cors";
// import nodemailer from "nodemailer";

const app = express();

// env
dotenv.config();

// DB connect
connectDB();

// middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://pabs-rho.vercel.app",
    ],
    credentials: true,
  })
);

// routes
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/images", express.static("../public/images"));
app.use("/users", userRoute);
app.use("/doctor", doctorRoute);
app.use("/appointment", appointmentRouter);


// appointment/bookAppointment
// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is Running ${PORT}`);
});