import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Doctors() {
  const { specialization } = useParams();
  const [doctor, setDoctor] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/doctor/all`)
      .then(res => res.json())
      .then(data => {
        const doctorData = data.doctors.filter(
          item =>
            item.specialization.toLowerCase().replace(/\s/g, "") ===
            specialization.toLowerCase().replace(/\s/g, "")

        );
        setDoctor(doctorData);
      });
  }, [specialization]);

  return (
    <>
      <h2>{specialization}</h2>

      <div className="halfshowdoctorcon">
        {doctor.map((item, index) => (
          <div key={index} className="card" onClick={() => navigate(`/doctor/${item._id}`)}>

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
    </>
  );
}

export default Doctors;