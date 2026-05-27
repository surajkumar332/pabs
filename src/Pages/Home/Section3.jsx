import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"

function Section3() {

    const [doctor, setDoctor] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                  return  console.log("No token found");
                }

                const res = await fetch( `${import.meta.env.VITE_API_URL}/doctor/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();
                if (res.status === 401) {
                    console.log("Unauthorized - please login again");
                    return;
                }
                setDoctor(data.doctors || []);
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Server Error",
                    width: "fit-content",
                    icon: "error"
                });
            }
        };

        getData();
    }, []);

    return (
        <>
            <div className="section3">
                <div className="txt1">
                    <h1>Top Doctors to Book</h1>
                    <p>Simply browse through our extensive list of trusted doctors.</p>
                </div>
                <div className="halfshowdoctorcon">
                    {doctor.sort(() => 0.5 - Math.random()).slice(0, 8).map((item, index) => (
                        <div key={index} className="card" onClick={() => navigate(`doctor/${item._id}`)}>

                            <div className="top">
                                <img src={item.img} alt={item.name}/>
                            </div>

                            <div className="bottom">
                                <p>{item.name}</p>
                                <p>{item.specialization}</p>
                            </div>

                        </div>
                    ))}
                </div>


            </div >

        </>
    )
};
export default Section3;