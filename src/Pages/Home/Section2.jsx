import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Section2() {

    const [allDoctor, setAllDoctor] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/doctor/all`)
            .then(res => res.json())
            .then((data) => {
                setAllDoctor(data.doctors);
            });
    }, []);

    return (
        <>
            <div className="txt">
                <h2>Find by Speciality
                </h2>
                <p>Easily find the right doctor and book your appointment anytime.</p>
            </div>

            <div className="doctors-container" >
                <div className="box"><button onClick={() => navigate("/doctors/generalphysician")}><img src="/images/gp.svg" alt="General Physician" style={{cursor:"pointer"}}/>
                </button>
                    <p>General Physician</p></div>
                <div className="box"><button onClick={() => navigate("/doctors/dermatologist")}><img src="/images/dt.svg" alt="Dermatologist" style={{cursor:"pointer"}}/></button>
                    <p>Dermatologist</p></div>
                <div className="box"><button onClick={() => navigate("/doctors/pediatrician")}><img src="/images/pt.svg" alt="Pediatrician" style={{cursor:"pointer"}}/></button>
                    <p>Pediatrician</p></div>
                <div className="box"><button onClick={() => navigate("/doctors/gastroenterologist")}><img src="/images/gt.svg" alt="Gastroenterologist" style={{cursor:"pointer"}}/></button>
                    <p>Gastroenterologist</p></div>
            </div>

        </>
    )
};
export default Section2;