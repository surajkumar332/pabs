import { useState, useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import "./Booked.css";

function Booked() {
    const [book, setBook] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    useEffect(() => {
        if (!userId) return;

        fetch(`${import.meta.env.VITE_API_URL}/appointment/booked/${userId}`)
            .then(res => res.json())
            .then(data => setBook(data.bookings || []))
            .catch(err => console.log(err));
    }, [userId]);

    const latest = book.length > 0 ? book[0] : null;

    return (
        <>
            <div className="booked-container">

                {!latest ? (
                    <div className="no-booking">
                        <h2>No Booking Found</h2>
                        <p>You don't have any confirmed appointment at the moment.</p>
                    </div>
                ) : (
                    <div className="confirmation-wrapper">

                        {/* success message */}
                        <div className="success-section">

                            <div className="success-icon">
                                ✓
                            </div>

                            <h1>Appointment Confirmed!</h1>

                            <p>
                                Your appointment has been successfully booked.
                            </p>

                            <span>
                                Please keep your appointment details handy.
                            </span>

                        </div>

                        {/* appointment card */}
                        <div className="booking-card">

                            <div className="booking-header">
                                <div>
                                    <h2>Appointment Details</h2>
                                    <p>Your booking information</p>
                                </div>

                                <span className="confirmed-badge">
                                    Confirmed
                                </span>
                            </div>

                            <div className="booking-content">

                                {/* doctor */}
                                <div className="doctor-section">

                                    <img
                                        className="doctor-img"
                                        src={latest.doctorId?.img}
                                        alt={latest.doctorId?.name || "Doctor"}
                                    />

                                    <div className="doctor-details">
                                        <span className="doctor-label">
                                            Your Doctor
                                        </span>

                                        <h3>
                                            {latest.doctorId?.name}
                                        </h3>

                                        <p>
                                            {latest.doctorId?.specialization}
                                        </p>
                                    </div>

                                </div>

                                {/* appointment information */}
                                <div className="booking-info">

                                    <div className="info-item">
                                        <span>Appointment Date</span>

                                        <strong>
                                            {new Date(
                                                latest.date
                                            ).toLocaleDateString("en-GB", {
                                                weekday: "short",
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric"
                                            })}
                                        </strong>
                                    </div>

                                    <div className="info-item">
                                        <span>Appointment Time</span>

                                        <strong>
                                            {latest.time}
                                        </strong>
                                    </div>

                                    <div className="info-item">
                                        <span>Doctor's Fee</span>

                                        <strong className="fee">
                                            ₹{latest.doctorId?.fee}
                                        </strong>
                                    </div>

                                </div>

                            </div>

                            <div className="booking-note">
                                <strong>Appointment reminder</strong>

                                <p>
                                    Please arrive a few minutes before your
                                    scheduled appointment time.
                                </p>
                            </div>

                        </div>

                    </div>
                )}

            </div>

            <Footer />
        </>
    );
}

export default Booked;