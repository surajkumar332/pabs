import { useState, useEffect } from "react";
import "./Admin.css";
import PaushedDate from "../../Components/PaushedDate/PaushedDate.jsx";

function Admin() {

    const [doctor, setDoctor] = useState([]);
    const [image, setImage] = useState(null);

    const [form, setForm] = useState({
        name: "",
        mobile: "",
        specialization: "",
        degree: "",
        experience: "",
        about: "",
        fee: "",
        email: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const getDoctors = async () => {
        const res = await fetch("http://localhost:5000/doctor/all");
        const data = await res.json();
        setDoctor(data.doctors || []);
    };

    useEffect(() => {
        getDoctors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("mobile", form.mobile);
        formData.append("specialization", form.specialization);
        formData.append("degree", form.degree);
        formData.append("experience", form.experience);
        formData.append("about", form.about);
        formData.append("fee", form.fee);
        formData.append("email", form.email);
        formData.append("image", image);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/doctor/addnewdoctor`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        if (res.ok) {
            getDoctors();
            setForm({
                name: "",
                mobile: "",
                specialization: "",
                degree: "",
                experience: "",
                about: "",
                fee: "",
                email: "",
            });
            setImage(null);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");

        await fetch(`${import.meta.env.VITE_API_URL}/doctor/deletedoctor/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        getDoctors();
    };

    return (
        <div className="admin-container">

            <div className="form-section">
                <h2>Add Doctor</h2>

                <form onSubmit={handleSubmit}>

                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />

                    <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />

                    <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} />

                    <input name="specialization" placeholder="Specialization" value={form.specialization} onChange={handleChange} />

                    <input name="degree" placeholder="Degree" value={form.degree} onChange={handleChange} />

                    <input name="experience" placeholder="Experience" value={form.experience} onChange={handleChange} />

                    <input name="about" placeholder="About" value={form.about} onChange={handleChange} />

                    <input name="fee" placeholder="Fee" value={form.fee} onChange={handleChange} />

                    <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />

                    <button type="submit">Add Doctor</button>
                </form>
            </div>

            <div className="list-section">
                <h2>Doctor List</h2>

                {doctor.map((doc) => (
                    <div key={doc._id} className="doctor-card">
                        <p>{doc.name} - {doc.specialization} - ₹{doc.fee}</p>
                         <PaushedDate id={doc._id} />
                        <button onClick={() => handleDelete(doc._id)}>Delete</button>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Admin;