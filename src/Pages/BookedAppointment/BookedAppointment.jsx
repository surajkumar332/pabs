import { useState, useEffect } from "react";
import "./BookedAppintment.css"
import Footer from "../../Components/Footer/Footer";
import Swal from "sweetalert2";
import BookingLoader from "../../Components/BookingAppointmentLoader/BookingLoader";

function Booked() {
    const [book, setBook] = useState([]);
    const [loadingId, setLoadingId] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;
    const now = new Date();
    useEffect(() => {
        if (!userId) return;
        fetch(`${import.meta.env.VITE_API_URL}/appointment/booked/${userId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBook(data.bookings || [])
            })
            .catch(err => console.log(err));
    }, [userId]);

    const filteredBookings = book.filter(item => {
        const appointmentDate = new Date(item.date);
        appointmentDate.setHours(23, 59, 59, 999);
        return appointmentDate >= now;
    });
    // cnacle function

    const handleCancel = async (id) => {

        const result = await Swal.fire({
            text: "Are you sure?",
            showCancelButton: true,
            width: "350px",
            confirmButtonText: "Yes, Cancel",
            cancelButtonText: "No",
            customClass: {
                htmlContainer: "txt",
                confirmButton: "cnf-btn",
                cancelButton: "cancle-btn"
            }
        });

        if (!result.isConfirmed) {
            return;
        }

        setLoadingId(id);

        try {

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/appointment/cancel/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await res.json();

            if (!res.ok) {

                Swal.fire({
                    title: "Error",
                    width: "fit-content",
                    text: data.message,
                });

                return;
            }

            setBook(prev =>
                prev.filter(item => item._id !== id)
            );

            Swal.fire({
                text: "Appointment Cancelled Successfully",
                width: "fit-content",
                timer: 3000,
                showConfirmButton: false
            });

        } catch (error) {

            console.log(error);

            Swal.fire({
                title: "Error",
                text: "Error cancelling appointment",
                width: "fit-content",
            });

        } finally {
            setLoadingId(null);
        }
    };
    return (
        <>
            <div className="appointment-banner">
                <div className="herosection">
                    <div className="herosection-txt">
                        <h2> Stay Ready for Your</h2>
                            <h3>Upcoming Appointment</h3>
                        <p>Keep track of your scheduled appointments and
                            arrive prepared for your consultation.</p>
                    </div>
                </div>

            </div>

            <div className="book-container">

                <div className="book-page-header">
                    <h1>My Appointments</h1>
                    <p>Manage and view your upcoming doctor appointments.</p>
                </div>

                {filteredBookings.length === 0 ? (
                    <div className="no-appointment">
                        <div className="no-appointment-icon">📅</div>
                        <h2>No Appointments Found</h2>
                        <p>
                            You don't have any upcoming appointments at the moment.
                        </p>
                    </div>
                ) : (
                    <div className="appointments-list">
                        {filteredBookings.map((item) => (
                            <div className="book-card" key={item._id}>

                                <div className="doctor-image-wrapper">
                                    <img
                                        src={item.doctorId?.img}
                                        alt={item.doctorId?.name || "Doctor"}
                                    />
                                </div>

                                <div className="book-info">

                                    <div className="doctor-heading">
                                        <div>
                                            <span className="doctor-label">
                                                Your Doctor
                                            </span>

                                            <h3>{item.doctorId?.name}</h3>

                                            <p className="specialization">
                                                {item.doctorId?.specialization}
                                            </p>
                                        </div>

                                        <span className="appointment-status">
                                            Confirmed
                                        </span>
                                    </div>

                                    <div className="appointment-details">

                                        <div className="appointment-detail">
                                            <span>Date</span>
                                            <strong>
                                                {new Date(item.date).toLocaleDateString(
                                                    "en-GB",
                                                    {
                                                        weekday: "short",
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    }
                                                )}
                                            </strong>
                                        </div>

                                        <div className="appointment-detail">
                                            <span>Time</span>
                                            <strong>{item.time}</strong>
                                        </div>

                                        <div className="appointment-detail">
                                            <span>Doctor's Fee</span>
                                            <strong className="appointment-fee">
                                                ₹{item.doctorId?.fee}
                                            </strong>
                                        </div>

                                    </div>

                                    <div className="appointment-actions">

                                        <p>
                                            Please arrive a few minutes before your
                                            scheduled appointment.
                                        </p>

                                        <button
                                            id="cancle"
                                            onClick={() => handleCancel(item._id)}
                                            disabled={loadingId !== null}
                                        >
                                            Cancel Appointment
                                        </button>

                                    </div>

                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </div>

            <BookingLoader isLoader={loadingId !== null} />




            <Footer />
        </>
    );
}

export default Booked;