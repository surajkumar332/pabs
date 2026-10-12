import { useState } from "react";
import "./Owner.css";

const Owner = () => {

    const [form, setForm] = useState({
        name: "",
        mobile: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/users/create-admin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(form)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert("Admin created successfully");

            setForm({
                name: "",
                mobile: "",
                password: ""
            });

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="owner-page">
            {/* hero section */}
            <section className="owner-hero">
                <div className="owner-hero-content">
                    <span>OWNER PANEL</span>
                    <h1>
                        Manage Your Hospital
                        <br />
                        From One Place
                    </h1>
                    <p>
                        Manage administrators, doctors, appointments and
                        hospital operations from your owner dashboard.
                    </p>
                </div>
            </section>

            {/* dashboard stats */}
            <section className="owner-stats">
                <div className="owner-stat-card">
                    <div className="stat-icon">A</div>
                    <div>
                        <h3>Admins</h3>
                        <p>Manage Administrators</p>
                    </div>
                </div>

                <div className="owner-stat-card">
                    <div className="stat-icon">D</div>
                    <div>
                        <h3>Doctors</h3>
                        <p>Manage Doctors</p>
                    </div>
                </div>

                <div className="owner-stat-card">
                    <div className="stat-icon">P</div>
                    <div>
                        <h3>Patients</h3>
                        <p>View Patients</p>
                    </div>
                </div>

                <div className="owner-stat-card">
                    <div className="stat-icon">A</div>
                    <div>
                        <h3>Appointments</h3>
                        <p>View Appointments</p>
                    </div>
                </div>
            </section>

            {/* management section */}
            <section className="owner-management">
                <div className="owner-section-heading">
                    <span>MANAGEMENT</span>
                    <h2>
                        Manage Your Hospital
                    </h2>
                    <p>
                        Choose an option below to manage different
                        parts of your hospital.
                    </p>
                </div>

                <div className="management-grid">
                    <div className="management-card">
                        <div className="management-icon">
                            A
                        </div>
                        <h3>Manage Admins</h3>
                        <p>
                            Create and manage administrators who
                            help operate the hospital.
                        </p>
                        <button>
                            Manage Admins
                        </button>
                    </div>

                    <div className="management-card">
                        <div className="management-icon">
                            D
                        </div>
                        <h3>Manage Doctors</h3>
                        <p>
                            Add doctors, update doctor information
                            and manage their availability.
                        </p>
                        <button>
                            Manage Doctors
                        </button>
                    </div>

                    <div className="management-card">
                        <div className="management-icon">
                            P
                        </div>
                        <h3>Manage Patients</h3>
                        <p>
                            View registered patients and their
                            appointment information.
                        </p>
                        <button>
                            View Patients
                        </button>
                    </div>

                    <div className="management-card">
                        <div className="management-icon">
                            A
                        </div>
                        <h3>Appointments</h3>
                        <p>
                            Monitor appointments and keep track
                            of hospital bookings.
                        </p>
                        <button>
                            View Appointments
                        </button>
                    </div>
                </div>
            </section>

            {/* create admin section */}
            <section className="create-admin-section">
                <div className="create-admin-content">
                    <span>ADMINISTRATION</span>
                    <h2>
                        Create New Admin
                    </h2>
                    <p>
                        Add a trusted administrator to help manage
                        your hospital operations.
                    </p>
                </div>

                <div className="create-admin">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Admin Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter admin name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group">
                            <label>Admin Mobile</label>
                            <input
                                type="text"
                                name="mobile"
                                placeholder="Enter admin mobile"
                                value={form.mobile}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group">
                            <label>Admin Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter admin password"
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit">
                            Create Admin
                        </button>
                    </form>
                </div>
            </section>

            {/* bottom section */}
            <section className="owner-bottom">
                <div>
                    <span>OWNER CONTROL</span>
                    <h2>
                        Everything You Need,
                        <br />
                        In One Dashboard.
                    </h2>
                </div>
                <p>
                    Keep your hospital operations organized,
                    secure and easy to manage from a single place.
                </p>
            </section>
        </div>
    );
};

export default Owner;