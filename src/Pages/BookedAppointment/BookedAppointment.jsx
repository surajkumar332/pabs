import { useState, useEffect } from "react";
import "./BookedAppintment.css"
import Footer from "../../Components/Footer/Footer";
import Swal from "sweetalert2";

function Booked() {
    const [book, setBook] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;
    const now = new Date();
    useEffect(() => {
        if (!userId) return;
        fetch(`http://localhost:5000/appointment/booked/${userId}`)
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
            cancelButtonText: "No"
        });

        if (!result.isConfirmed) {
            return;
        }

        try {

            const res = await fetch(`http://localhost:5000/appointment/cancel/${id}`,{
                    method: "DELETE"
                }
            );

            const data = await res.json();

            if (!res.ok) {

                Swal.fire({
                    title: "Error",
                    width: "fit-content",
                    text: data.message,
                    icon: "error"
                });

                return;
            }

            setBook(prev =>
                prev.filter(item => item._id !== id)
            );

            Swal.fire({
                title: "Cancelled",
                text: "Appointment Cancelled Successfully",
                icon: "success",
                width: "fit-content",
                timer: 2000,
                showConfirmButton: false
            });

        } catch (error) {

            console.log(error);

            Swal.fire({
                title: "Error",
                text: "Error cancelling appointment",
                width: "fit-content",
                icon: "error"
            });

        }

    };
    return (
        <>
            <div className="book-container">

                {filteredBookings.length === 0 ? (
                    <p>No Appointment Booked at This Time</p>
                ) : (
                    filteredBookings.map((item) => (
                        <div className="book-card" key={item._id}>

                            <img src={item.doctorId?.img} alt="" />

                            <div className="book-info">
                                <h3>{item.doctorId?.name}</h3>
                                <p>{item.doctorId?.specialization}</p>
                                <p><strong>Doctor's Fee:</strong> {item.doctorId?.fee}</p>

                                <p>
                                    <strong>Date:</strong>{" "}
                                    {new Date(item.date).toLocaleDateString("en-GB")}
                                </p>
                                <p><strong>Time:</strong> {item.time}</p>
                            </div>

                            <button id="cancle" onClick={() => handleCancel(item._id)}>
                                Cancel
                            </button>

                        </div>
                    ))
                )}

            </div>

            <Footer />
        </>
    );
}

export default Booked;