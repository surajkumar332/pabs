import { useState } from "react";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert2"

function Register() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("patientName", form.name);
        localStorage.setItem("userId", data.user._id);
        navigate("/");
      } else {
        swal.fire({
          text: data.message,
          width: "fit-content",
          icon: "error"
        })
      }

    } catch (error) {
      swal.fire({
        title: "Error",
        text: "Server Error",
        width: "fit-content",
        icon: "error"
      });
    }
  };

  return (
    <>
    <div className="rc">
    <div className="register-card">
      <h2>Create Account</h2>
      <p>Please sign up to book appointment</p>

      <label>Enter Name</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <label>Enter Mobile</label>
      <input
        type="text"
        name="mobile"
        value={form.mobile}
        onChange={handleChange}
        required
      />

      <label>Enter Password</label>
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button onClick={handleSubmit}>Register</button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
    </div>
    </>
  );
}

export default Register;