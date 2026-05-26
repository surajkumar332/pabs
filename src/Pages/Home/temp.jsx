import { useNavigate } from "react-router-dom";

function temp() {
    const navigate = useNavigate();

    return (
        <>
        
            <div className="section4cont">
                <div className="txtandbtn">
                    <h1>Book AppointmentWith 10+ Trusted Doctors</h1>
                    <button id="ca" onClick={()=> navigate("/register")}>Create Account</button>
                </div>
                <div className="girl">
                    <img src="../images/girlimage.png" alt="" />
                </div>
            </div>

        </>
    );
}

export default temp;