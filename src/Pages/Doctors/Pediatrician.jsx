import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Pediatrician.css";
import Cta from "../../Components/CTA/Cta";
import Faq from "../../Components/FAQ/Faq";
import Section4 from "../Home/Section4";
import Footer from "../../Components/Footer/Footer";
import Loader from "../../Components/Loader/Loader";



function Pediatrician() {
    const [pediatricianDoctor, setPediatricianDoctor] = useState([]);
    const [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        const getPediatrician = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/doctor/pediatrician`);
                const data = await res.json();

                setPediatricianDoctor(data.pediatrician);
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
        getPediatrician();
    }, []);

    return (
        <>
            <div className="pediatrician">
                <div className="herosection">
                    <div className="herosection-txt">
                        <h2>Pediatrician</h2>
                        <h3>Caring for Your Child's Health & Development</h3>
                        <p>Get compassionate medical care for infants, children, and adolescents from experienced pediatricians. Explore our doctors and find the right pediatric specialist for your child's needs.</p>
                        <button onClick={() => {
                            document.getElementById("book-appointment").scrollIntoView({
                                behavior: "smooth"
                            });
                        }}>Book an Appointment</button>
                    </div>
                </div>
                <div className="about-pediatrician">
                    <h2>About Pediatrics</h2>
                    <p>Pediatrics is the branch of medicine focused on the health, growth, and development of infants, children, and adolescents. Pediatricians provide medical care for children at different stages of development, from routine health assessments and vaccinations to the diagnosis and treatment of common childhood illnesses.<br /><br />

                    Children can experience health concerns such as fever, cough, infections, allergies, digestive problems, nutritional issues, and respiratory conditions. Pediatricians assess a child's symptoms, medical history, growth, and development to provide appropriate care and guidance based on their individual needs.<br /><br />

                    At PABS, you can explore pediatrician profiles, learn about their qualifications and experience, and choose a doctor according to your child's healthcare needs. With convenient appointment booking, PABS makes it easier for parents and caregivers to connect with a pediatrician and arrange a consultation.
                    </p>

                </div>
                <div className="common-condtion-pediatrician">
                    <h2>Common Conditions</h2>
                    <div className="conditions-tags">
                        <span>Childhood Fever</span>
                        <span>Cold & Cough</span>
                        <span>Childhood Infections</span>
                        <span>Allergies</span>
                        <span>Respiratory Problems</span>
                        <span>Digestive Problems</span>
                        <span>Nutritional Concerns</span>
                    </div>
                </div>

                <div className="chooseus">
                    <div className="heading">
                        <h2>Why Choose Us</h2>
                        <p>Finding the right pediatrician is an important part of caring for your child's health. PABS helps parents and caregivers explore pediatrician profiles and conveniently book appointments based on their child's healthcare needs.</p>
                    </div>
                    <div className="content">
                        <div className="box">
                            <h4>Experienced Pediatricians</h4>
                            <p>Explore pediatrician profiles with their qualifications, experience, and areas of expertise.</p>
                        </div>
                        <div className="box">
                            <h4>Easy Appointment Booking</h4>
                            <p>Choose a suitable doctor, select an available appointment time, and book your consultation with just a few steps.</p>
                        </div>
                        <div className="box">
                            <h4>Convenient Access</h4>
                            <p>Find Pediatrician in one place without having to search through multiple sources or Multiple Places.</p>
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
                        <p>Meet our Dermatologist who provide care for a wide range of everyday Beauty concerns. Explore their profiles, experience, and expertise to find a doctor who fits your healthcare needs.
                        </p>
                    </div>
                {isLoader ? (
                    <Loader />
                ) : (
                    <div className="fullshowdoctorcont">

                        {pediatricianDoctor.map((item, index) => (
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

                )};                    
                </section>
                <Cta />
                <Faq />
                <Section4 />

            </div>

            <Footer />
        </>
    );
}

export default Pediatrician;