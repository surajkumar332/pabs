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
    if(token){
        const decode = jwtDecode(token);
        isAdmin = decode.role ==="admin";
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


    return (
        <>
            <div className="nav-links">
                <span>
                    <img src="/images/logo.png" alt="Logo" height={"120px"} />
                </span>
                <div className="links">
                    <Link to={"/"}>Home</Link>
                    <Link to={"/allDoctors"}>All Doctors</Link>
                    <Link to={"/bookedAppointment"}>Booked Appointment</Link>
                    <Link to={"/about"}>About</Link>
                    {isAdmin && <Link to="/admin">Admin</Link>}

                    <button id="ca-btn" onClick={handleButton}>

                        {localStorage.getItem("token") ? "LogOut" : "Login"}
                    </button>
                  
                </div>

            </div>

        </>
    )
};

export default Navbar;