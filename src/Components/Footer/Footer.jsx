import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <hr />
            <div className="footer-container">

                <div className="footer-section">
                    <h3>About</h3>
                    <p>
                        We provide an easy way to book appointments with trusted doctors.
                        Fast, simple, and reliable healthcare service.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/allDoctors">Doctors</Link></li>
                        <li><Link to="/allDcotors">Book Appointment</Link></li>
                        <li><Link to="/register">Register / Login</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Doctor Categories</h3>
                    <ul>
                        <li><Link to="/doctors/generalphysician">General Physician</Link></li>
                        <li><Link to="/doctors/dermatologist">Dermatologist</Link></li>
                        <li><Link to="/doctors/pediatrician">Pediatrician</Link></li>
                        <li><Link to="/doctors/gastroenterologist">Gastroenterologist</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Contact</h3>
                    <p>Phone: +91 98765 43210</p>
                    <p>Email: support@pabs.com</p>
                    <p>Location: Mohali</p>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 Patient Appointment Booking System. All rights reserved.</p>
            </div>

        </footer>
    );
}

export default Footer;