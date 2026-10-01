import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"
import Loader from "../../Components/Loader/Loader"


function Section3() {

    const [doctor, setDoctor] = useState([]);
    const [isLoader, setIsLoader] = useState(true);
    const navigate = useNavigate();


    function nextpage() {
        navigate("/allDoctors");
    }

    useEffect(() => {
        const getData = async () => {
            try {

                const res = await fetch(`${import.meta.env.VITE_API_URL}/doctor/all`);


                const data = await res.json();
                if (res.status === 401) {
                    Swal.fire({
                    text: "Unauthorized - please login again",
                    width: "fit-content"

                   });
                    return;
                }

                setDoctor(data.doctors || []);
                setIsLoader(false);

            } catch (error) {
                Swal.fire({
                    text: "Server Error",
                    width: "fit-content",
                });
            }
        };

        getData();
    }, []);

    return (
        <>
            {/* <p style={{color: "GrayText"}}> "doctorRoute.post
                  "/addnewdoctor",
                  verifyUser,
                  allowRoles("owner", "admin"),
                  upload.single("image"),
                  async (req, res) isko dekho doctorrouter me abhi yahi tk bna hai"</p> */}
            <div className="doctors-list">
                <div className="txt1">
                    <h1>Top Doctors to Book</h1>
                    <p>Simply browse through our extensive list of trusted doctors.</p>
                </div>
                <div className="section3">
                    { isLoader ? (
                        <Loader />

                    ) : (
                        <div className="fullshowdoctorcont">
                            {doctor.sort(() => 0.5 - Math.random()).slice(0, 10).map((item, index) => (
                                <div
                                    key={index}
                                    className="card"
                                    onClick={() => navigate(`doctor/${item._id}`)}
                                >

                                    <div className="top">
                                        <img src={item.img} alt={item.name} />
                                    </div>

                                    <div className="bottom">
                                        <p>{item.name}</p>
                                        <p>{item.specialization}</p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )};
                </div>


                <button id="more-btn" onClick={nextpage}>Meet Our All Heros</button>


            </div >

        </>
    )
};
export default Section3;