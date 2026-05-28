import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    image: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    specialization: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true

    },
    fee: {
        type: Number,
        default: 300,
        required: true
    },
    availableSlots: [
        {
            type: String,
            required: true
        }
    ],
    pausedDates: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;