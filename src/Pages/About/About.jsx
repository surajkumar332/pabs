import Footer from "../../Components/Footer/Footer";
import "./About.css";

function About() {
  return (
    <>
      <div className="about-container">

        <div className="about-herosection">
          <div className="about-herosection-txt">
            <h2>About PABS</h2>
            <h3>Making Healthcare Simple & Accessible</h3>
            <p>
              Patient Appointment Booking System (PABS) helps patients
              find trusted doctors, explore available appointments, and
              book consultations with ease.
            </p>
          </div>
        </div>

        <div className="about-pabs">
          <h1 className="about-title">About Us</h1>

          <p className="about-intro">
            The Patient Appointment Booking System (PABS) is designed to make
            healthcare access simple, fast, and convenient. Our platform allows
            patients to easily find doctors, view their availability, and book
            appointments without any hassle.
          </p>

          <div className="about-sections">

            <div className="about-card">
              <h2>Our Mission</h2>
              <p>
                Our mission is to simplify the healthcare booking process by
                providing a user-friendly and reliable platform. We aim to
                reduce waiting time and make appointment scheduling efficient.
              </p>
            </div>

            <div className="about-card">
              <h2>What We Offer</h2>
              <p>
                We offer a wide range of doctor specializations including
                General Physician, Dermatologist, Pediatrician, and
                Gastroenterologist. Users can select doctors and book
                appointments based on available time slots.
              </p>
            </div>

            <div className="about-card">
              <h2>Why Choose Us</h2>
              <p>
                Our system ensures secure login, easy navigation, and a
                smooth booking experience. It is designed for both
                efficiency and reliability, making healthcare more accessible.
              </p>
            </div>

          </div>
        </div>

      </div>
      <Footer />
    </>

  );
}

export default About;