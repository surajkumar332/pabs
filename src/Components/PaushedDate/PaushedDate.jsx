import { useState } from "react";
import Swal from "sweetalert2";
import "./PaushedDate.css";

function PaushedDate({ id }) {
    const [date, setDate] = useState("");

    const handlePause = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/doctor/paused/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ date })
                }
            );

            const data = await res.json();

            Swal.fire({
                text: data.message,
                timer: 2000,
                width: "fit-content",
                showConfirmButton: false,
                icon: res.ok ? "success" : "error"
            });

            if (res.ok) {
                setDate("");
            }
        } catch (error) {
            console.log(error);

            Swal.fire({
                title: "Error",
                text: "Server Error",
                icon: "error",
                width: "fit-content"
            });
        }
    };

    const handleDeleteBreak = async () => {
        if (!date) {
            Swal.fire({
                text: "Please select a date first",
                timer: 2000,
                width: "fit-content",
                showConfirmButton: false,
                icon: "warning"
            });

            return;
        }

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/doctor/paused/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ date })
                }
            );

            const data = await res.json();

            Swal.fire({
                text: data.message,
                timer: 2000,
                width: "fit-content",
                showConfirmButton: false,
                icon: res.ok ? "success" : "error"
            });

            if (res.ok) {
                setDate("");
            }
        } catch (error) {
            console.log(error);

            Swal.fire({
                title: "Error",
                text: "Server Error",
                icon: "error",
                width: "fit-content"
            });
        }
    };

    return (
        <div className="pause-date">
            <div className="pause-date-title">
                <span>Doctor Availability</span>
                <h4>Manage Break</h4>
            </div>
            <form onSubmit={handlePause}>
                <div className="date-form-group">
                    <label>Select Break Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="pause-date-actions">
                    <button type="submit" className="pause-btn">
                        Add Break
                    </button>
                    <button
                        type="button"
                        className="delete-break-btn"
                        onClick={handleDeleteBreak}
                    >
                        Delete Break
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PaushedDate;