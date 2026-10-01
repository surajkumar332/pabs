// import { useState } from "react";
import "./Loader.css";

function Loader(){
//    const [loader, setLoader] = useState(true);

   return(
    <div className="loader-container">
        <div className="loader-card"></div>
        <div className="loader-card"></div>
        <div className="loader-card"></div>
        <div className="loader-card"></div>
        <div className="loader-card"></div>
    </div>
    
   );
}

export default Loader;
