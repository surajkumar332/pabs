import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DoctorDetails.css";
import Slots from "../../Components/Slots/Slots";
import RelatedDoctor from "../../Components/RelatedDoctor/RelatedDoctor";
import Footer from "../../Components/Footer/Footer";
import Swal from "sweetalert2"

function DoctorDetails() {
  const { id } = useParams();

  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/doctor/details/${id}`);
        const data = await res.json();

        setDoctor(data.doctor);
        window.scrollTo(0, 0);
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
  }, [id]);

  return (
    <>
      <div className="doctordetails">
        <div className="image">
          <img src={doctor.img} alt={doctor.name} />
        </div>

        <div className="details">
          <h2>{doctor.name}</h2>

          <p>
            {doctor.specialization} &nbsp;&nbsp;&nbsp;
            {doctor.experience}
          </p>

          <p>About: {doctor.about}</p>

          <p>Appointment Fee: {doctor.fee}</p>
        </div>
      </div>

      <p>
        Booking Slots
        <br />
      </p>

      <Slots id={id} />

      <RelatedDoctor
        key={id}
        specialization={doctor.specialization}
        id={id}
      />

      {/* footer */}
      <Footer/>
    </>

  );
}

export default DoctorDetails;