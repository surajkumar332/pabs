import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
function Section2() {

    const [allDoctor, setAllDoctor] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/doctor/all`)
            .then(res => res.json())
            .then((data) => {
                setAllDoctor(data.doctors);
            });
    }, []);

    return (
        <>
                <div className="doctors-container-text">
                    <h2>Find by Speciality</h2>
                    <p>Easily find the right doctor and book your appointment anytime.</p>
                </div>

                <div className="doctors-container">

                    <div className="box">
                        <div className="text-image-container">

                            <div className="card-front">
                                <img
                                    src="/images/generalphysician doctor.webp"
                                    alt="general physician doctor"
                                />
                            </div>

                            <div className="card-back">
                                <h2>General Physician</h2>
                                <p>Consult for fever, cold, infections and common health concerns.</p>
                                <button onClick={() => navigate("/doctors/generalphysician")}>
                                    View Doctors
                                </button>
                            </div>

                        </div>

                        {/* <button className="image-btn" onClick={() => navigate("/doctors/generalphysician")}>
            <img src="/images/gp.svg" alt="General Physician" />
        </button>
        <p>General Physician</p> */}
                    </div>


                    <div className="box">
                        <div className="text-image-container">

                            <div className="card-front">
                                <img
                                    src="/images/Dermatologist image.webp"
                                    alt="dermatologist"
                                />
                            </div>

                            <div className="card-back">
                                <h2>Dermatologist</h2>
                                <p>Get expert care for skin, hair and nail related concerns.</p>
                                <button onClick={() => navigate("/doctors/dermatologist")}>
                                    View Doctors
                                </button>
                            </div>

                        </div>

                        {/* <button className="image-btn" onClick={() => navigate("/doctors/dermatologist")}>
            <img src="/images/dt.svg" alt="Dermatologist" />
        </button>
        <p>Dermatologist</p> */}
                    </div>


                    <div className="box">
                        <div className="text-image-container">

                            <div className="card-front">
                                <img
                                    src="/images/Pediatrician image.webp"
                                    alt="pediatrician"
                                />
                            </div>

                            <div className="card-back">
                                <h2>Pediatrician</h2>
                                <p>Specialized healthcare for infants, children and teenagers.</p>
                                <button onClick={() => navigate("/doctors/pediatrician")}>
                                    View Doctors
                                </button>
                            </div>

                        </div>

                        {/* <button className="image-btn" onClick={() => navigate("/doctors/pediatrician")}>
            <img src="/images/pt.svg" alt="Pediatrician" />
        </button>
        <p>Pediatrician</p> */}
                    </div>


                    <div className="box">
                        <div className="text-image-container">

                            <div className="card-front">
                                <img
                                    src="/images/Gastroenterologist image.webp"
                                    alt="gastroenterologist"
                                />
                            </div>

                            <div className="card-back">
                                <h2>Gastroenterologist</h2>
                                <p>Expert care for digestive system and stomach related problems.</p>
                                <button onClick={() => navigate("/doctors/gastroenterologist")}>
                                    View Doctors
                                </button>
                            </div>

                        </div>

                        {/* <button className="image-btn" onClick={() => navigate("/doctors/gastroenterologist")}>
            <img src="/images/gt.svg" alt="Gastroenterologist" />
        </button>
        <p>Gastroenterologist</p> */}
                    </div>

                </div>
        </>
    )
};
export default Section2;