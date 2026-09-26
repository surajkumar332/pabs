import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./GeneralPhysician.css";
import Footer from "../../Components/Footer/Footer";
import Cta from "../../Components/CTA/Cta";
import Fqa from "../../Components/FAQ/Faq";
import Section4 from "../Home/Section4";


function GeneralPhysician() {
    const [generalPhysicianDoctor, setGeneralPhysicianDoctor] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const getGeneralPhysicianDoctor = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/doctor/generalphysician`);

                const data = await res.json();
                setGeneralPhysicianDoctor(data.generalPhysician);
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    width: "fit-content",
                    text: "Server Error",
                    icon: "error"
                });
            }

        };
        getGeneralPhysicianDoctor();
    }, []);
    return (
        <>
            <div className="General-Physician">
                <div className="herosection">
                    <div className="herosection-txt">
                        <h2>General Physician</h2>
                        <h3>Trusted Care for Your Everyday Health</h3>
                        <p>Get personalized medical care for common illnesses, routine health concerns, and ongoing wellness from experienced general physicians.</p>
                        <button onClick={() => {
                            document.getElementById("book-appointment").scrollIntoView({
                                behavior: "smooth"
                            });
                        }}>Book an Appointment</button>
                    </div>
                </div>
                <div className="about-generalphysician">
                    <h2>About General Physician</h2>
                    <p>A general physician provides comprehensive medical care for a wide range of common health concerns and everyday illnesses. They evaluate symptoms, identify health conditions, recommend appropriate treatment, and help patients maintain their overall well-being.<br /> <br />

                        From fever, infections, and digestive problems to blood pressure and other routine health concerns, general physicians provide personalized care based on each patient's needs. They can also guide patients when specialist care or further medical evaluation is required.<br /> <br />

                        A general physician is often the first point of contact when you experience a health concern. They provide comprehensive medical care for people of different ages and help diagnose, manage, and treat a wide range of common illnesses and health conditions. From routine health concerns to symptoms that require further investigation, general physicians assess your overall health and recommend appropriate treatment based on your individual needs.<br /> <br />

                        General physicians commonly provide care for conditions such as fever, cold and flu, infections, headaches, digestive problems, allergies, body pain, high blood pressure, diabetes, and other everyday health concerns. They may also monitor ongoing health conditions, review symptoms, recommend diagnostic tests when necessary, and provide guidance on maintaining a healthier lifestyle.<br /> <br />

                        At PABS, you can explore trusted general physicians, learn about their experience and areas of expertise, and choose a doctor based on your healthcare needs. With convenient appointment booking, PABS makes it easier to connect with a general physician and get the care you need without unnecessary hassle.</p>
                </div>
                <div className="common-condtion-generalphysician">
                    <h2>Common Conditions</h2>
                    <div className="conditions-tags">
                        <span>Fever & Flu</span>
                        <span>Cold & Cough</span>
                        <span>Infections</span>
                        <span>Digestive Problems</span>
                        <span>Allergies</span>
                        <span>High Blood Pressure</span>
                        <span>Diabetes</span>
                        <span>Headaches & Migraine</span>
                    </div>
                </div>

                {/* <ChooseUs />  */}
                <section id="book-appointment">
                    <div className="ourdoctors">
                        <h2>Our Doctors</h2>
                        <p>Meet our general physicians who provide care for a wide range of everyday health concerns. Explore their profiles, experience, and expertise to find a doctor who fits your healthcare needs.
                        </p>
                    </div>

                    <div className="fullshowdoctorcont">

                        {generalPhysicianDoctor.map((item, index) => (
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
                </section>
                <Cta />
                <Fqa />
                <Section4 />

            </div>

        <Footer/>   
        </>
    );
}
export default GeneralPhysician;