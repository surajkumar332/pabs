import { useState, useEffect } from "react";
import "./Admin.css";
import PaushedDate from "../../Components/PaushedDate/PaushedDate.jsx";

function Admin() {

    const [doctor, setDoctor] = useState([]);
    const [patient, setPatient] = useState([]);
    const [appointment,  setAppointment] = useState([]);
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

    const getPatient = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/get-patient`);
        const data = await res.json();
        setPatient(data.patient || []);


    };
    useEffect(()=> {
        getPatient();

    }, []);


    const getAppointment = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/appointment/get-appointment`);
        const data = await res.json();
        setAppointment(data.appointment || []);


    };
    useEffect(()=> {
        getAppointment();

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
            <section className="admin-hero">
                <div className="admin-hero-content">
                    <span>ADMIN DASHBOARD</span>
                    <h1>
                        Manage Your
                        <br />
                        Hospital Efficiently
                    </h1>
                    <p>
                        Manage doctors, appointments and hospital
                        operations from your administration dashboard.
                    </p>
                </div>
            </section>


            <section className="admin-stats">
                <div className="admin-stat-card">
                    <div className="admin-stat-icon">D</div>
                    <div>
                        <h3>{doctor.length}+</h3>
                        <p>Total Doctors</p>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-icon">A</div>
                    <div>
                        <h3>{appointment.length}+</h3>
                        <p>Appointments</p>
                    </div>
                </div>


                <div className="admin-stat-card">
                    <div className="admin-stat-icon">P</div>
                    <div>
                        <h3>{patient.length}+</h3>
                        <p>Patients</p>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-icon">S</div>
                    <div>
                        <h3>Active</h3>
                        <p>System Status</p>
                    </div>
                </div>
            </section>


            <section className="admin-management">
                <div className="admin-heading">
                    <span>HOSPITAL MANAGEMENT</span>
                    <h2>
                        Manage Doctors
                    </h2>
                    <p>
                        Add new doctors, manage existing doctors and
                        control their availability.
                    </p>
                </div>

                <div className="admin-management-grid">
                    <div className="admin-management-card">
                        <div className="admin-card-icon">
                            D
                        </div>
                        <h3>Add Doctor</h3>
                        <p>
                            Add a new doctor with their professional
                            details and consultation information.
                        </p>
                        <a href="#add-doctor">
                            Add Doctor
                        </a>
                    </div>

                    <div className="admin-management-card">
                        <div className="admin-card-icon">
                            A
                        </div>
                        <h3>Appointments</h3>
                        <p>
                            View and manage upcoming and previous
                            patient appointments.
                        </p>
                        <button>
                            View Appointments
                        </button>
                    </div>

                    <div className="admin-management-card">
                        <div className="admin-card-icon">
                            P
                        </div>
                        <h3>Patients</h3>
                        <p>
                            View registered patients and their
                            appointment information.
                        </p>
                        <button>
                            View Patients
                        </button>
                    </div>
                </div>
            </section>

            <section
                className="add-doctor-section"
                id="add-doctor"
            >
                <div className="add-doctor-heading">
                    <span>DOCTOR MANAGEMENT</span>
                    <h2>
                        Add New Doctor
                    </h2>
                    <p>
                        Add a doctor to your hospital by entering
                        their professional and contact information.
                    </p>
                </div>

                <div className="admin-form">
                    <div className="form-section">
                        <form onSubmit={handleSubmit}>
                            <div className="doctor-image-input">
                                <label>
                                    Doctor Image
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setImage(e.target.files[0])
                                    }
                                />
                            </div>

                            <div className="admin-form-grid">
                                <div className="form-input">
                                    <label>Name</label>
                                    <input
                                        name="name"
                                        placeholder="Enter doctor name"
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-input">
                                    <label>Mobile</label>
                                    <input
                                        name="mobile"
                                        placeholder="Enter mobile number"
                                        value={form.mobile}
                                        onChange={handleChange}
                                    />
                                </div>


                                <div className="form-input">
                                    <label>Specialization</label>

                                    <input
                                        name="specialization"
                                        placeholder="e.g. General Physician"
                                        value={form.specialization}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-input">
                                    <label>Degree</label>
                                    <input
                                        name="degree"
                                        placeholder="e.g. MBBS, MD"
                                        value={form.degree}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-input">
                                    <label>Experience</label>
                                    <input
                                        name="experience"
                                        placeholder="e.g. 8 Years"
                                        value={form.experience}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-input">
                                    <label>Consultation Fee</label>
                                    <input
                                        name="fee"
                                        placeholder="Enter consultation fee"
                                        value={form.fee}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-input">
                                    <label>Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Enter email address"
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-input">
                                    <label>About Doctor</label>
                                    <input
                                        name="about"
                                        placeholder="Short description"
                                        value={form.about}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="add-doctor-btn"
                            >
                                Add Doctor
                            </button>
                        </form>
                    </div>
                </div>
            </section>


            <section className="doctor-list-section">
                <div className="doctor-list-heading">
                    <div>
                        <span>DOCTOR MANAGEMENT</span>
                        <h2>
                            Doctor List
                        </h2>
                    </div>
                    <p>
                        {doctor.length} Doctors Registered
                    </p>
                </div>

                <div className="doctor-list-content">
                    {doctor.map((doc) => (
                        <div key={doc._id} className="doctor-card">
                            <div className="doctor-card-main">
                                <div className="doctor-avatar">
                                    <img src={doc.img} alt={doc.name} />
                                </div>
                                <div className="doctor-info">
                                    <h3>{doc.name}</h3>
                                    <p>{doc.specialization}</p>
                                    <span>₹{doc.fee} Consultation</span>
                                </div>
                            </div>
                            <div className="doctor-action">
                                <div className="pause-action">
                                    <PaushedDate id={doc._id} />
                                </div>
                                <button className="delete-doctor-btn" onClick={() => handleDelete(doc._id)}>
                                  Delete Doctor
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="admin-bottom">
                <div>
                    <span>ADMIN CONTROL</span>
                    <h2>
                        Everything You Need
                        <br />
                        To Manage Your Hospital.
                    </h2>
                </div>
                <p>
                    Keep doctors, appointments and patients organized
                    with a simple and professional administration system.
                </p>
            </section>
        </div>
    );
}

export default Admin;