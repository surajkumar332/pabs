import express from "express";
import Appointment from "../models/AppointmentSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Patient from "../models/PatientSchema.js";
import { sendEmail } from "../express.js";

const appointmentRouter = express.Router();


// book appoinment
appointmentRouter.post("/bookAppointment", async (req, res) => {
  try {

    const { patientId, doctorId, date, time } = req.body;
    console.log(req.body, "req.body");

    if (!doctorId || !patientId || !date || !time) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const exists = await Appointment.findOne({ doctorId, date, time });
    if (exists) {
      return res.status(400).json({ message: "already Booked" });
    }

    const booked = new Appointment({
      patientId,
      doctorId,
      date,
      time
    });

    await booked.save();


    const doctor = await Doctor.findById(doctorId).lean();
    const patient = await Patient.findById(patientId).lean();

    sendEmail(
      "roy142184@gmail.com",
      "New Appointment",
      `Patient ${patient.name} 
      booked appointment on ${date} at ${time} `,
    );

    res.status(201).json({
      message: "Appointment booked successfully",
      booked
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});


// booked 
appointmentRouter.get("/booked/:id", async (req, res) => {
  try {
    const bookings = await Appointment.find({
      patientId: req.params.id
    })
      .sort({ createdAt: -1 })
      .populate("doctorId");

    res.json({ bookings });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// booked slots
appointmentRouter.get("/bookedSlots/:doctorId", async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const start = new Date(date);
    if (isNaN(start)) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const data = await Appointment.find({
      doctorId: req.params.doctorId,
      date: {
        $gte: start,
        $lt: end
      }
    }, "time");

    const times = data.map(item => item.time);

    res.json(times);

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

//  cancle appointment
appointmentRouter.delete("/cancel/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const doctor = await Doctor.findById(appointment.doctorId).lean();
    const patient = await Patient.findById(appointment.patientId).lean();

    // email send (cancel)
    
      sendEmail(
        "roy142184@gmail.com",
        "Appointment Cancelled",
        `Patient ${patient.name} cancled appointment on ${appointment.date} at ${appointment.time}`
      );

    res.json({message: "Appointment cancelled successfully"});

  } catch (error) {
    res.status(500).json({message: "Server Error"});
  }
});

export default appointmentRouter;