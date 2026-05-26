import { useEffect, useState } from "react";
import "./Slots.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"

function Slots({ id }) {
    const [selectedDate, setSelectedDate] = useState(0);
    const [selectedTime, setSelectedTime] = useState(null);
    const [bookedTime, setBookedTime] = useState([]);
    const [pausedDates, setPausedDates] = useState([]);
    const navigate = useNavigate();

    // create slots
    const [slots] = useState(() => {
        let arr = [];

        for (let i = 0; i < 7; i++) {
            let date = new Date();
            date.setDate(date.getDate() + i);

            if (date.getDay() === 0) continue; // Sunday skip

            let timeSlots = [
                "10:00 AM",
                "11:00 AM",
                "12:00 PM",
                "2:00 PM",
                "3:00 PM",
                "4:00 PM",
                "5:00 PM"
            ];

            if (date.getDay() === 6) {
                timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM"];
            }

            arr.push({
                day: date.toLocaleDateString("en-US", { weekday: "short" }),
                date: date.getDate(),
                month: date.toLocaleDateString("en-US", { month: "short" }),
                time: timeSlots
            });
        }

        return arr;
    });

    // booking function
    const sendData = async () => {
        try {
            const appointmentDate = new Date();
            appointmentDate.setDate(appointmentDate.getDate() + selectedDate);

            const formattedDate = appointmentDate.toISOString().split("T")[0];

            const user = JSON.parse(localStorage.getItem("user"));
            console.log(user, "asdfg");
            if (!user) {

                Swal.fire({
                    title: "Login Required",
                    text: "Please Login First",
                    icon: "warning",
                    width: "fit-content",
                    timer: 2000,
                    showConfirmButton: false
                });
                navigate("/login");

                return;
            }

            const name = user.name;
            const userId = user._id;

            if (!userId) {
                Swal.fire({
                    text: "Please login as a Patient",
                    width: "fit-content",
                    timer: 2000,
                    showConfirmButton: false
                });

                return;
            }

            if (selectedTime === null) {
                Swal.fire({
                    text:"Select Time First",
                    timer: 2000,
                    width: "fit-content",
                    showConfirmButton: false
                })
                return;
            }

            const res = await fetch("http://localhost:5000/appointment/bookAppointment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    doctorId: id,
                    patientName: name,
                    patientId: userId,
                    date: formattedDate,
                    time: slots[selectedDate].time[selectedTime]
                })
            });

            const data = await res.json();

            if (!res.ok) {

                Swal.fire({
                    title: "Error",
                    text: data.message,
                    width: "fit-content",
                    icon: "error"
                });

                return;
            }

            // update UI instantly
            setBookedTime(prev => [...prev, slots[selectedDate].time[selectedTime]]);

            navigate("/booked");

        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error",
                text: "Server Error",
                width: "fit-content",
                icon: "error"
            });
        }
    };

    // fetch booked slots
    useEffect(() => {
        if (!id) return;

        const appointmentDate = new Date();
        appointmentDate.setDate(appointmentDate.getDate() + selectedDate);

        const formattedDate = appointmentDate.toISOString().split("T")[0];

        console.log("DATE SEND:", formattedDate); // debug

        if (!formattedDate) return;

        fetch(`http://localhost:5000/appointment/bookedSlots/${id}?date=${formattedDate}`)
            .then(res => res.json())
            .then(data => {
                console.log("DATA:", data);

                if (Array.isArray(data)) {
                    setBookedTime(data);
                } else {
                    setBookedTime([]);
                }
            })
            .catch(() => setBookedTime([]));

    }, [id, selectedDate]);

    // paushed 
    useEffect(() => {

        fetch(`http://localhost:5000/doctor/details/${id}`)
            .then(res => res.json())
            .then(data => {
                setPausedDates(data.doctor.pausedDates || []);
            });

    }, [id]);
    const appointmentDate = new Date();

    appointmentDate.setDate(
        appointmentDate.getDate() + selectedDate
    );

    const formattedDate =
        appointmentDate.toISOString().split("T")[0];

    const isPaused =
        pausedDates.includes(formattedDate);

    console.log(pausedDates);
    console.log(formattedDate);
    console.log(isPaused);

    if (isPaused) {

        Swal.fire({
            title: "Unavailable",
            text: "Doctor unavailable on this date",
            width: "fit-content",
            showConfirmButton: false
        });

        return;
    }

    return (
        <>
            {/* Date selection */}
            <div className="flex">
                {slots.map((item, index) => (
                    <div
                        key={index}
                        className={selectedDate === index ? "dateBox active" : "dateBox"}
                        onClick={() => {
                            setSelectedDate(index);
                            setSelectedTime(null);
                        }}
                    >
                        <p>{item.day}</p>
                        <h3>{item.date}</h3>
                    </div>
                ))}
            </div>

            {/* Time slots */}
            {isPaused ? (
                <h2>Doctor is unavailable on this date</h2>
            ) : (

                <div className="timeRow">

                    {slots[selectedDate].time.map((t, i) => {

                        const isBooked =
                            Array.isArray(bookedTime) &&
                            bookedTime.includes(t);

                        return (
                            <button
                                key={i}
                                disabled={isBooked}
                                className={
                                    isBooked
                                        ? "timeBox disable"
                                        : selectedTime === i
                                            ? "timeBox active"
                                            : "timeBox"
                                }

                                onClick={() =>
                                    !isBooked &&
                                    setSelectedTime(i)
                                }
                            >
                                {t}
                            </button>
                        );
                    })}

                </div>
            )}

            {/* Book button */}
            <button id="bookApp" onClick={sendData}>
                Book Appointment
            </button>
        </>
    );
}

export default Slots;