import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Gastroenterologist.css";
import Swal from "sweetalert2";
import Cta from "../../Components/CTA/Cta";
import Faq from "../../Components/FAQ/Faq";
import Section4 from "../Home/Section4";
import Footer from "../../Components/Footer/Footer";

function Gastroenterologist() {

    const [gastroenterologist, setGastroenterologist] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getGastroenterologist = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/doctor/gastroenterologist`);
                const data = await res.json();

                setGastroenterologist(data.gastroenterologist);
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    width: "fit-content",
                    text: "Server Error",
                });
                console.log("mai to error hu removeEventListener", error)
            }
        };
        getGastroenterologist();
    }, []);

    return (
        <>
            <div className="gastroenterologist">
                <div className="herosection">
                    <div className="herosection-txt">
                        <h2>Gastroenterologist</h2>
                        <h3>Expert Care for Your Digestive Health</h3>
                        <p>Get personalized medical care for digestive and gastrointestinal concerns from experienced gastroenterologists. Explore our doctors and find the right specialist for your healthcare needs.</p>
                        <button onClick={() => {
                            document.getElementById("book-appointment").scrollIntoView({
                                behavior: "smooth"
                            });
                        }}>Book an Appointment</button>
                    </div>
                </div>
                <div className="about-gastroenterologist">
                    <h2>About Gastroenterology</h2>
                    <p>
                        Gastroenterology is a medical specialty focused on the digestive system, including the stomach, intestines, liver, pancreas, gallbladder, and related organs. Gastroenterologists diagnose and manage a wide range of digestive and gastrointestinal conditions and help patients understand the causes of their symptoms.<br /><br />

                        Digestive problems such as acidity, heartburn, abdominal pain, constipation, diarrhea, bloating, and other gastrointestinal concerns can affect everyday life. A gastroenterologist evaluates symptoms, medical history, and relevant test results to determine the appropriate care and recommend further investigation when needed.<br /><br />

                        At PABS, you can explore gastroenterologist profiles, learn about their qualifications and experience, and choose a specialist according to your healthcare needs. With convenient appointment booking, PABS makes it easier to connect with a gastroenterologist and arrange a consultation for your digestive health concerns.
                    </p>

                </div>
                <div className="common-condtion-gastroenterologist">
                    <h2>Common Conditions</h2>
                    <div className="conditions-tags">
                        <span>Acidity & Heartburn</span> 
                        <span>GERD</span>
                        <span>Constipation</span>
                        <span>Diarrhea</span>
                        <span>Irritable Bowel Syndrome</span>
                        <span>Abdominal Pain</span>
                        <span>Liver Problems</span>
                        <span>Gallstones</span>
                    </div>
                </div>

                <div className="chooseus">
                    <div className="heading">
                        <h2>Why Choose Us</h2>
                        <p>Finding the right gastroenterologist can make it easier to address digestive and gastrointestinal concerns. PABS brings doctor information and appointment booking together in one convenient place.</p>
                    </div>
                    <div className="content">
                        <div className="box">
                            <h4>Experienced Gastroenterologists</h4>
                            <p>Explore gastroenterologist profiles with their qualifications, experience, and areas of expertise.</p>
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
                        <h2>Our Gastroenterologists</h2>
                        <p>Explore our gastroenterologists and find a specialist to help you manage your digestive health needs.
                        </p>
                    </div>

                    <div className="fullshowdoctorcont">

                        {gastroenterologist.map((item, index) => (
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
                <Faq />
                <Section4 />

            </div>

            <Footer />
        </>
    );

}

export default Gastroenterologist;