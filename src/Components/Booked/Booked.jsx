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

            <h1>Booking Confirmed</h1>

            {!latest ? (
                <p className="no-booking">No Booking Found</p>
            ) : (
                <div className="booking-card" key={latest._id}>

                    {latest.doctorId ? (
                        <>
                            <div className="booking-info">
                                <h3>{latest.doctorId.name}</h3>
                                <p>{latest.doctorId.specialization}</p>

                                <div>
                                    <span>Doctor's Fee-&nbsp;&nbsp;&nbsp;</span>
                                    <strong>₹{latest.doctorId.fee}</strong>
                                </div>

                                <div>
                                    <span>Appointment Date-&nbsp;&nbsp;&nbsp;</span>
                                    <strong>
                                        {new Date(latest.date).toLocaleDateString("en-GB")}
                                    </strong>
                                </div>

                                <div>
                                    <span>Appointment Time-&nbsp;&nbsp;&nbsp;</span>
                                    <strong>{latest.time}</strong>
                                </div>

                            </div>
                            <div className="doctor-section">
                                <img
                                    className="doctor-img"
                                    src={latest.doctorId.img}
                                    alt=""
                                />

                                
                            </div>


                        </>
                    ) : (
                        <p className="no-booking">Doctor Not Found</p>
                    )}

                </div>
            )}

        </div>

        <Footer/>

</>        
    );
}

export default Booked;