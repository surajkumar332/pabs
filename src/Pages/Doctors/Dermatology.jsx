import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Dermatology.css";
import Cta from "../../Components/CTA/Cta";
import Faq from "../../Components/FAQ/Faq";
import Section4 from "../Home/Section4";
import Footer from "../../Components/Footer/Footer";
import Loader from "../../Components/Loader/Loader";



function Dermatology() {

    const [dermatologyDoctor, setDermatologyDoctor] = useState([]);
    const [isLoader, setIsLoader] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getDermatologyDoctor = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/doctor/dermatology`);
                const data = await res.json();

                setDermatologyDoctor(data.dermatology);
                setIsLoader(false);
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    width: "fit-content",
                    text: "Server Error",
                    icon: "error"
                });
            }
        }
        getDermatologyDoctor();
    }, []);

    return (
        <>

            <div className="dermatology">
                <div className="herosection">
                    <div className="herosection-txt">
                        <h2>Dermatology</h2>
                        <h3>Expert Care for Healthy Skin, Hair & Nails</h3>
                        <p>Get personalized dermatological care for skin, hair, and nail concerns from experienced dermatologists. Explore our doctors and find the right specialist for your needs.</p>
                        <button onClick={() => {
                            document.getElementById("book-appointment").scrollIntoView({
                                behavior: "smooth"
                            });
                        }}>Book an Appointment</button>
                    </div>
                </div>
                <div className="about-dermatology">
                    <h2>About Dermatology</h2>
                    <p>Dermatology is a medical specialty focused on the diagnosis, treatment, and management of conditions affecting the skin, hair, and nails. Dermatologists help patients with a wide range of concerns, from common skin problems and allergies to conditions that require ongoing medical care.<br /> <br />

                        Common concerns such as acne, eczema, pigmentation, fungal infections, hair loss, dandruff, and other skin conditions can affect both your health and confidence. A dermatologist evaluates your symptoms, medical history, and skin condition to determine an appropriate approach for your care.<br /> <br />

                        At PABS, you can explore dermatologist profiles, learn about their qualifications and areas of expertise, and choose a doctor according to your healthcare needs. With convenient appointment booking, PABS makes it easier to connect with a dermatologist and take the next step toward better skin, hair, and nail health.
                    </p>

                </div>
                <div className="common-condtion-dermatology">
                    <h2>Common Conditions</h2>
                    <div className="conditions-tags">
                        <span>Acne & Breakouts</span>
                        <span>Eczema</span>
                        <span>Skin Allergies</span>
                        <span>Fungal Infections</span>
                        <span>Hair Loss</span>
                        <span>Dandruff</span>
                        <span>Pigmentation</span>
                        <span>Psoriasis</span>
                    </div>
                </div>

                <div className="chooseus">
                    <div className="heading">
                        <h2>Why Choose Us</h2>
                        <p>Finding the right general physician should be simple and convenient. PABS helps you explore doctor profiles, understand their areas of expertise, and book an appointment according to your needs.</p>
                    </div>

                    <div className="content">
                        <div className="box">
                            <h4>Experienced Dermatologist</h4>
                            <p>Explore profiles of Dermatologist with their qualifications, experience, and areas of specialization.</p>
                        </div>
                        <div className="box">
                            <h4>Easy Appointment Booking</h4>
                            <p>Choose a suitable doctor, select an available appointment time, and book your consultation with just a few steps.</p>
                        </div>
                        <div className="box">
                            <h4>Convenient Access</h4>
                            <p>Find Dermatologist in one place without having to search through multiple sources or Multiple Places.</p>
                        </div>
                        <div className="box">
                            <h4>Clear Doctor Information</h4>
                            <p>View important details about doctors before booking, helping you make an informed choice based on your requirements.</p>
                        </div>
                    </div>
                </div>
                {/* <ChooseUs /> */}
                <section id="book-appointment">
                    <div className="ourdoctors">
                        <h2>Our Doctors</h2>
                        <p>Meet  our Dermatologist who provide care for a wide range of everyday       Beauty concerns. Explore their profiles, experience, and expertise to find a doctor who fits your healthcare needs.
                        </p>
                    </div>


                    {isLoader ? (
                        <Loader />
                    ) : (

                        <div className="fullshowdoctorcont">

                            {dermatologyDoctor.map((item, index) => (
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
                    )}
                </section>
                <Cta />
                <Faq />
                <Section4 />

            </div>


            <Footer />
        </>
    );
}

export default Dermatology;