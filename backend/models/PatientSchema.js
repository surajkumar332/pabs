import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "patient"
    }
}
    , {
        timestamps: true

    });


const Patient = mongoose.model("Patient", patientSchema);

export default Patient;