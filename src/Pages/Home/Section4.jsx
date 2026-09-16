import { useNavigate } from "react-router-dom";


function Section4() {
    const navigate = useNavigate();

    return (
        <>
            
            <div className="section4cont">
                <div className="txtandbtn">
                    <h1>Book AppointmentWith 10+<br/>
                    Trusted Doctors</h1>
                    <p>Quality Care From Doctors You Can Trust. Get reliable medical care from experienced doctors, with easy appointments and personalized guidance whenever your health needs attention.</p>
                    <button id="ca" onClick={()=> navigate("/register")}>Connet With Us</button>
                </div>
                <div className="girl">
                    <img src="../images/girlimage.png" alt="girlimage" />
                </div>
            </div>

        </>
    );
}

export default Section4;