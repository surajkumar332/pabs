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
                const res = await fetch(`${import.meta.env.VITE_API_URL}/doctor/all`);
                const data = await res.json();

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
            <div className="fullshowdoctorcont">
            {doctor.map((item, index) => (
                <div key={item._id} className="card" onClick={()=> navigate(`/doctor/${item._id}`)}>
                    <div className="top">
                    <img src={item.img} alt={item.name} />
                    </div>
                    <div className="bottom">
                    <p>{item.name}</p>
                    <p>{item.specialization}</p>
                    </div>
                </div>
            ))}
        </div >

        {/* footer */}
        <Footer/>
        </>
    )
};

export default AllDoctors;