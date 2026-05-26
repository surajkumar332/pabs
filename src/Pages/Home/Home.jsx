import Footer from "../../Components/Footer/Footer";
import "./Home.css";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./temp";

import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    function nextpage(){
        navigate("/allDoctors");
    }



    return (
        <>
            {/* section1 started */}
            <Section1/>
            {/* section 1 ended */}

            {/* section2 started */}
            <Section2 />
            {/* section2 ended */}

            {/* sectin 3 stared */}
            <Section3/>
             <button id="more-btn" onClick={nextpage}>More</button>
            {/* section 3 ended */}
            
            {/* section4 added */}
            <Section4/>
            {/* section4 ended */}

             {/*section5 footer started  */}
             <Footer/>

             {/* this is the end */}

        </>
    )
};

export default Home;