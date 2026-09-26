import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["owner", "admin", "doctor", "patient"],
        default: "patient"
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        // required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;