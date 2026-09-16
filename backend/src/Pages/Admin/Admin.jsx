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
        const res = await fetch(`${import.meta.env.VITE_API_URL}/doctor/all`);
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

    <div className="admin-form">
        <div className="form-section">

            <h2>Add Doctor</h2>

            <form onSubmit={handleSubmit}>

                <div className="form-input">
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>

                <div className="form-input">
                    <input
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-input">
                    <input
                        name="mobile"
                        placeholder="Mobile"
                        value={form.mobile}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-input">
                    <input
                        name="specialization"
                        placeholder="Specialization"
                        value={form.specialization}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-input">
                    <input
                        name="degree"
                        placeholder="Degree"
                        value={form.degree}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-input">
                    <input
                        name="experience"
                        placeholder="Experience"
                        value={form.experience}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-input">
                    <input
                        name="about"
                        placeholder="About"
                        value={form.about}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-input">
                    <input
                        name="fee"
                        placeholder="Fee"
                        value={form.fee}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-input">
                    <input
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Add Doctor</button>

            </form>

        </div>
    </div>


    <div className="doctor-list">
        <div className="list-section">

            <h2>Doctor List</h2>

            <div className="doctor-list-content">

                {doctor.map((doc) => (

                    <div key={doc._id} className="doctor-card">

                        <div className="doctor-info">
                            <p className="doctor-name">{doc.name}</p>
                            <p className="doctor-specialization">
                                {doc.specialization}
                            </p>
                            <p className="doctor-fee">
                                ₹{doc.fee}
                            </p>
                        </div>

                        <div className="doctor-action">
                            <PaushedDate id={doc._id} />

                            <button
                                onClick={() => handleDelete(doc._id)}
                            >
                                Delete
                            </button>
                        </div>

                    </div>

                ))}

            </div>

        </div>
    </div>

</div>
    );
}

export default Admin;