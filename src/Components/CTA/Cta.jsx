import "./Cta.css";
import {useNavigate } from "react-router-dom";

function Cta(){
   const navigate = useNavigate();

   return(
    <>
     <div className="Cta-section">
        <h2>Your Health, Our Priority</h2>
        <p>Take the next step toward better healthcare. Explore our trusted doctors and book an appointment that fits your schedule.</p>
        <button onClick={()=> navigate(`/allDoctors`)}>Choose Doctor Yourself</button>
     </div>
    </>
   )
}

export default Cta;