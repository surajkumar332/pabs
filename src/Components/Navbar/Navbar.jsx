import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";


function Navbar() {

    const [user, setUser] = useState(localStorage.getItem("patientName"));
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    let isAdmin = false;
    if (token) {
        const decode = jwtDecode(token);
        isAdmin = decode.role === "admin";
    }

    const handleButton = () => {
        if (localStorage.getItem("token")) {
            localStorage.removeItem("patientName");
            localStorage.removeItem("token");
            localStorage.removeItem("mobile");

            setUser(null);
            navigate("/login");
        } else {
            navigate("/register");
        }
    };
    const closeMenu = () => {
        document.querySelector(".navbar-parent .links").classList.remove("active");
    };


    return (
        <>
            <div className="navbar-parent">

                <div className="nav-links">

                    <span>
                        <img src="/images/pabs-logo.webp" alt="Logo" height={"80px"} />
                    </span>

                    <div className="links">
                        <Link to={"/"} onClick={closeMenu}>Home</Link>
                        <Link to={"/allDoctors"} onClick={closeMenu}>All Doctors</Link>
                        <Link to={"/bookedAppointment"} onClick={closeMenu}>Booked Appointment</Link>
                        <Link to={"/about"} onClick={closeMenu}>About</Link>

                        {isAdmin && <Link to="/admin" onClick={closeMenu}>Admin</Link>}
                    </div>

                    <div className="button-parent">
                        <button id="ca-btn" onClick={handleButton}>
                            {localStorage.getItem("token") ? "LogOut" : "Login"}
                        </button>
                    </div>

                    <button
                        className="hamburger"
                        onClick={() =>
                            document.querySelector(".navbar-parent .links").classList.toggle("active")
                        }
                    >
                        ☰
                    </button>

                </div>

            </div>
        </>
    )
};

export default Navbar;