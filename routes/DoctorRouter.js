import express from "express";
import Doctor from "../models/DoctorSchema.js";
import Appointment from "../models/AppointmentSchema.js";
import { verifyUser, allowRoles } from "../middleware/auth.js";
import multer from "multer";

const doctorRoute = express.Router();

const upload = multer({
  dest: "uploads/"
});

doctorRoute.post(
  "/addnewdoctor",
  verifyUser,
  allowRoles("owner", "admin"),
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
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server error"
      });
    }
  }
);

doctorRoute.put(
  "/updateimage/:id",
  verifyUser,
  allowRoles("owner", "admin"),
  upload.single("image"),
  async (req, res) => {
    try {
      const doctor = await Doctor.findById(req.params.id);

      if (!doctor) {
        return res.status(404).json({
          message: "Doctor not found"
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: "Please upload an image"
        });
      }

      doctor.image = req.file.path;

      await doctor.save();

      res.status(200).json({
        message: "Doctor image updated successfully",
        doctor
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server error"
      });
    }
  }
);

doctorRoute.get("/all", async (req, res) => {
  try {
    console.log("GET /doctor/all hit");

    const doctors = await Doctor.find();

    console.log("Doctors:", doctors.length);

    res.status(200).json({
      message: "all doctors fetched successfully",
      doctors
    });
  } catch (error) {
    console.log("error", error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

doctorRoute.get("/details/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(400).json({
        message: "Doctor Not Found"
      });
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

doctorRoute.get("/related/:specialization/:id", async (req, res) => {
  try {
    const { specialization, id } = req.params;

    const doctors = await Doctor.find({
      specialization: specialization,
      _id: { $ne: id }
    });

    res.status(200).json({
      doctors
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
});

doctorRoute.put("/paused/:id", async (req, res) => {
  try {
    const { date } = req.body;

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          pausedDates: date
        }
      },
      {
        new: true
      }
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

doctorRoute.delete(
  "/deletedoctor/:id",
  verifyUser,
  allowRoles("owner", "admin"),
  async (req, res) => {
    try {
      const doctor = await Doctor.findByIdAndDelete(req.params.id);

      if (!doctor) {
        return res.status(404).json({
          message: "Doctor not found"
        });
      }

      await Appointment.deleteMany({
        doctorId: doctor._id
      });

      res.status(200).json({
        message: "Doctor and appointments deleted successfully",
        doctor
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

export default doctorRoute;