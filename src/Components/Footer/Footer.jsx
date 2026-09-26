import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-section footer-about">
                    {/* <h2>PABS</h2> */}
                    {/* white logo */}
                    {/* <img src="/images/pabs-logo-footer-image.png" alt="Logo" height={"80px"} /> */}
                    <img src="/images/pabs-logo.webp" alt="Logo" height={"80px"} />
                    
                    <p>
                        Patient Appointment Booking System makes healthcare
                        simple by helping you find trusted health specilist heros and book
                        appointments quickly and easily.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/allDoctors">Doctors</Link></li>
                        <li><Link to="/allDoctors">Book Appointment</Link></li>
                        <li><Link to="/register">Register / Login</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Specialties</h3>
                    <ul>
                        <li>
                            <Link to="/doctors/generalphysician">
                                General Physician
                            </Link>
                        </li>
                        <li>
                            <Link to="/doctors/dermatologist">
                                Dermatologist
                            </Link>
                        </li>
                        <li>
                            <Link to="/doctors/pediatrician">
                                Pediatrician
                            </Link>
                        </li>
                        <li>
                            <Link to="/doctors/gastroenterologist">
                                Gastroenterologist
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="footer-section footer-contact">
                    <h3>Contact Us</h3>

                    <p>
                        +91 98765 43210
                    </p>

                    <p>
                        support@pabs.com
                    </p>

                    <p>
                        Mohali, Punjab
                    </p>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 PABS — Patient Appointment Booking System</p>

                <div>
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms & Conditions</Link>
                </div>
            </div>

        </footer>

        </>
    );
}

export default Footer;

