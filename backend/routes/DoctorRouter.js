import express from "express";
import Doctor from "../models/DoctorSchema.js";
import Appointment from "../models/AppointmentSchema.js";
import { verifyAdmin } from "../middleware/auth.js";
import multer from "multer";

const doctorRoute = express.Router();

// add new doctor
// multer setup for images
const upload = multer({
  dest: "uploads/"
});


doctorRoute.post(
  "/addnewdoctor",
  verifyAdmin,
  upload.single("image"),

  async (req, res) => {

    try {

      const {
        name,
        mobile,
        specialization,
        degree,
        experience,
        about,
        fee,
        availableSlots
      } = req.body;


      // uploaded image
      const image = req.file?.path;


      const exists = await Doctor.findOne({ mobile });

      if (exists) {
        return res.status(409).json({
          message: "Doctor already exists"
        });
      }


      const doctor = await Doctor.create({
        image,
        name,
        mobile,
        specialization,
        degree,
        experience,
        about,
        fee,
        availableSlots
      });


      res.status(201).json({
        message: "Doctor added successfully",
        doctor
      });

    }

    catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error"
      });

    }

  }
);


// all doctors

doctorRoute.get("/all", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    console.log("doctors", doctors)

    res.status(200).json({
      message: "all doctors fetched successfully",
      doctors
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
});

// single doctor

doctorRoute.get("/details/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(400).json({ message: "Doctor Not Found" });
    }
    res.status(200).json({
      message: "Doctor details",
      doctor
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
});


// related doctor
doctorRoute.get("/related/:specialization/:id", async (req, res) => {
  try {
    const { specialization, id } = req.params;
    const doctors = await Doctor.find({
      specialization: specialization,
      _id: { $ne: id }
    });

    res.json({ doctors });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// paused 
doctorRoute.put("/paused/:id", async (req, res) => {

  try {

    const { date } = req.body;

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, { $push: { pausedDates: date } },
      { new: true }
    );

    res.status(200).json({
      message: "Paused Successfully",
      doctor
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});



// delete doctor

doctorRoute.delete("/deletedoctor/:id", verifyAdmin, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "doctor not found" });
    }
    await Appointment.deleteMany({ doctorId: doctor._id });
    if (doctor?.email) {
      sendEmail(
        doctor.email,
        "Account & Appointments Removed",
        "Your doctor account and patient appointments has been deleted"
      )
    }

    res.json({
      message: "Doctor & its appointmenet deleted Successfully",
      doctor
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


export default doctorRoute;