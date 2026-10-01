import { useNavigate } from "react-router-dom";
import "./Home.css";
function Section2() {

    const navigate = useNavigate();


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
                    </div>


                    <div className="box">
                        <div className="text-image-container">

                            <div className="card-front">
                                <img
                                    src="/images/dermatologist image.webp"
                                    alt="dermatologist"
                                />
                            </div>

                            <div className="card-back">
                                <h2>Dermatologist</h2>
                                <p>Get expert care for skin, hair and nail related concerns.</p>
                                <button onClick={() => navigate("/doctors/dermatology")}>
                                    View Doctors
                                </button>
                            </div>

                        </div>
                    </div>


                    <div className="box">
                        <div className="text-image-container">

                            <div className="card-front">
                                <img
                                    src="/images/pediatrician image.webp"
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
                    </div>


                    <div className="box">
                        <div className="text-image-container">

                            <div className="card-front">
                                <img
                                    src="/images/gastroenterologist image.webp"
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
                    </div>

                </div>
        </>
    )
};
export default Section2;