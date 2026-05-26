import { useState, useEffect } from "react";

function Booked() {
    const [book, setBook] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    const userId = user?._id;

    useEffect(() => {
        if (!userId) return;

        fetch(`http://localhost:5000/appointment/booked/${userId}`)
            .then(res => res.json())
            .then(data => setBook(data.bookings || []))
            .catch(err => console.log(err));
    }, [userId]);

    const latest = book.length > 0 ? book[0] : null;

    return (
        <>
            <h1>Booking Confirmed</h1>

            {!latest ? (
                <p>No Booking Found</p>
            ) : (
                <div key={latest._id}>

                    {latest.doctorId ? (
                        <>
                            <img src={latest.doctorId.img} alt="" />
                            <h3>{latest.doctorId.name}</h3>
                            <p>{latest.doctorId.specialization}</p>
                            <p>Doctor's Fee: {latest.doctorId.fee}</p>

                        </>
                    ) : (
                        <p>Doctor Not Found</p>
                    )}

                    <p>
                        Appointment Date:{" "}
                        {new Date(latest.date).toLocaleDateString("en-GB")}
                    </p>

                    <p>Appointment Time: {latest.time}</p>

                </div>
            )}
        </>
    );
}

export default Booked;