import {useNavigate} from "react-router-dom";

function Section1() {
    const navigate = useNavigate();

    return (
        <>
            <div className="main-container">
                <div className="text">
                    <h1>Book Appointment
                        With Trusted Doctors</h1>
                    <p>Simply browse through our extensive list of trusted doctors,
                        schedule your appointment hassle-free.</p>
                    <button id="ba" onClick={()=> navigate("/allDoctors")}>Book Appointment →</button>
                </div>
                <div className="doctor-image">
                    <img src="/images/doctor-group.png" alt="" /></div>
            </div>
        </>
    )
};
export default Section1;