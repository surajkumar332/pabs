import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RelatedDoctor({ specialization, id }) {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!specialization) return;

    const getRelated = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/doctor/related/${specialization}/${id}`
        );

        const data = await res.json();
        setDoctors(data.doctors);
      } catch (error) {
        console.log(error);
      }
    };

    getRelated();
  }, [specialization, id]);

  return (
    <>
      <div
        className="rd"
        style={{ marginTop: "60px", fontSize: "20px" }}
      >
        <h2 style={{ fontSize: "50px" }}>Related Doctors</h2>
        <p>Simply browse through our extensive list of trusted doctors.</p>
      </div>

      <div
        className="fullshowdoctorcont"
        style={{ marginLeft: "200px" }}
      >
        {doctors.map((item, index) => (
          <div
            key={item._id}
            className="card"
            onClick={() => navigate(`/doctor/${item._id}`)}
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
    </>
  );
}

export default RelatedDoctor;