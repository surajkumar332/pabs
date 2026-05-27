import { useState } from "react";
import Swal from "sweetalert2";

function PaushedDate({ id }) {

    const [form, setForm] = useState({
        date: ""
    });

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await fetch(
                 `${import.meta.env.VITE_API_URL}/doctor/paused/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        date: form.date
                    })
                }
            );

            const data = await res.json();

            Swal.fire({
                text: data.message,
                timer: 2000,
                width: "fit-content",
                showConfirmButton: false
            });

        } catch (error) {

            console.log(error);
            Swal.fire({
                title: "Error",
                width: "fit-content",
                text: "Server Error",
                icon: "error"
            });

        }

    };

    return (
        <>

            <form onSubmit={handleSubmit}>


                <label>Enter Date</label>

                <input
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            date: e.target.value
                        })
                    }
                    required
                />

                <button type="submit">
                    Submit
                </button>

            </form>
        </>
    );
}

export default PaushedDate;