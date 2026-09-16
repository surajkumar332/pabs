import { useNavigate } from "react-router-dom";

function Section1() {
    const navigate = useNavigate();

    return (
        <>
            <div className="hero-container">
                <div className="hero-text-container">
                    <p>Your Health, Our Priority.</p>
                    <h1>Personalized Healthcare for Better Health and Peace of Mind</h1>

                    <button id="ba" onClick={() => navigate("/allDoctors")}>Book Appointment →</button>
                </div>
                <div className="doctor-image">
                    <img src="/images/doctors group.webp" alt="doctor-group" />
                </div>
            </div>

        </>
    )
};
export default Section1;