import { useState, useEffect } from "react";
import "./AllDoctors.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Swal from "sweetalert2"

function AllDoctors() {

    const [doctor, setDoctor] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                // const res = await fetch(`${import.meta.env.VITE_API_URL}/doctor/all`);
                const res = await fetch("https://pabs-4jen.onrender.com/doctor/all");
                const data = await res.json();
                console.log(data, "data");
                setDoctor(data.doctors);
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    width: "fit-content",
                    text: "Server Error",
                    icon: "error"
                });
            }
        };

        getData();
    }, []);


    return (
        <>  
            <div className="hero-section-all-doctors">

                <div className="hero-all-doctors-text">
                    <h1>Find the Right Doctor <div className="green-txt">for You</div></h1>
                    
                    <p>
                        Browse through our trusted doctors and book your appointment
                        with ease.
                    </p>

                </div>

            </div>

            <div className="doctor-list-text">
                <h2>Our Specialists</h2>
            </div>

            <div className="fullshowdoctorcont">
                {doctor.map((item, index) => (
                    <div key={item._id} className="card" onClick={() => navigate(`/doctor/${item._id}`)}>
                        <div className="top">
                            <img src={item.img} alt={item.name} />
                        </div>
                        <div className="bottom">
                            <h3>{item.name}</h3>
                            <p>{item.specialization}</p>
                        </div>
                    </div>
                ))}
            </div >

            {/* footer */}
            <Footer />
        </>
    )
};

export default AllDoctors;