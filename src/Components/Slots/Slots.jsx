import { useEffect, useState } from "react";
import "./Slots.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"
import BookingLoader from "../BookingAppointmentLoader/BookingLoader";

function Slots({ id }) {
    const [selectedDate, setSelectedDate] = useState(0);
    const [selectedTime, setSelectedTime] = useState(null);
    const [bookedTime, setBookedTime] = useState([]);
    const [pausedDates, setPausedDates] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const navigate = useNavigate();

    // create slots
    const [slots, setSlots] = useState(() => {
        let arr = [];

        for (let i = 0; i < 7; i++) {
            let date = new Date();
            date.setDate(date.getDate() + i);

            if (date.getDay() === 0) continue; // Sunday skip

            let timeSlots = [
                "9:00 AM",
                "10:00 AM",
                "11:00 AM",
                "12:00 PM",
                "2:00 PM",
                "3:00 PM",
                "4:00 PM",
                "5:00 PM"
            ];

            // Saturday
            if (date.getDay() === 6) {
                timeSlots = [
                    "9:00 AM",
                    "10:00 AM",
                    "11:00 AM",
                    "12:00 PM"
                ];
            }

            // check today's slots
            const today = new Date();

            timeSlots = timeSlots.map(time => {

                let expired = false;

                if (date.toDateString() === today.toDateString()) {

                    const [timePart, period] = time.split(" ");

                    let [hours, minutes] = timePart
                        .split(":")
                        .map(Number);

                    if (period === "PM" && hours !== 12) {
                        hours += 12;
                    }

                    if (period === "AM" && hours === 12) {
                        hours = 0;
                    }

                    const slotTime = new Date();

                    slotTime.setHours(
                        hours,
                        minutes,
                        0,
                        0
                    );

                    expired = slotTime <= today;
                }

                return {
                    time: time,
                    expired: expired
                };
            });

            arr.push({
                day: date.toLocaleDateString("en-US", {
                    weekday: "short"
                }),
                date: date.getDate(),
                month: date.toLocaleDateString("en-US", {
                    month: "short"
                }),
                time: timeSlots
            });
        }

        return arr;
    });

    // booking function
    const sendData = async () => {
        setIsLoader(true);
        try {
            const appointmentDate = new Date();
            appointmentDate.setDate(appointmentDate.getDate() + selectedDate);

            const formattedDate = appointmentDate.toISOString().split("T")[0];

            const user = JSON.parse(localStorage.getItem("user"));
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
                    text: "Please login for Booking an Appointment",
                    width: "fit-content",
                    timer: 2000,
                    showConfirmButton: false
                });

                  navigate("/login");
                  return;
            }

            if (selectedTime === null) {
                Swal.fire({
                    text: "Select Time First",
                    timer: 2000,
                    width: "fit-content",
                    showConfirmButton: false
                })
                return;
            }

            const res = await fetch(`${import.meta.env.VITE_API_URL}/appointment/bookAppointment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    doctorId: id,
                    patientName: name,
                    patientId: userId,
                    date: formattedDate,
                    time: slots[selectedDate].time[selectedTime].time
                })
            });

            const data = await res.json();

            if (!res.ok) {

                Swal.fire({
                    text: data.message,
                    width: "fit-content",
                });

                return;
            }

            // update UI instantly
            setBookedTime(prev => [...prev, slots[selectedDate].time[selectedTime]]);

            navigate("/booked");

        } catch (error) {
            Swal.fire({
                text: "Server Error",
                width: "fit-content",
            });
        } finally {
            setIsLoader(false);
        }
    };

    // fetch booked slots
    useEffect(() => {
        if (!id) return;

        const appointmentDate = new Date();
        appointmentDate.setDate(appointmentDate.getDate() + selectedDate);

        const formattedDate = appointmentDate.toISOString().split("T")[0];


        if (!formattedDate) return;

        fetch(`${import.meta.env.VITE_API_URL}/appointment/bookedSlots/${id}?date=${formattedDate}`)
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

        fetch(`${import.meta.env.VITE_API_URL}/doctor/details/${id}`)
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
        <div className="booking-container">
            {/* Date selection */}
            <div className="booking-slots">
                <p>
                    Booking Slots
                </p>
            </div>

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
                        <p>{item.day}</p>&nbsp;
                        <p>{item.date}</p>
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
                            bookedTime.includes(t.time);

                        const isDisabled =
                            isBooked || t.expired;

                        return (
                            <button
                                key={i}
                                disabled={isDisabled}
                                className={
                                    isDisabled
                                        ? "timeBox disable"
                                        : selectedTime === i
                                            ? "timeBox active"
                                            : "timeBox"
                                }
                                onClick={() =>
                                    !isDisabled && setSelectedTime(i)
                                }
                            >
                                {t.time}
                            </button>
                        );
                    })}
                </div>
            )}

            <button id="bookApp" onClick={sendData} disabled={isLoader}>
                Book Appointment
            </button>

            <BookingLoader isLoader={isLoader} />
        </div>
    );
}

export default Slots;