import { useState } from "react";
import "./Login.css";
import {Link, useNavigate } from "react-router-dom";
import swal from "sweetalert2";

function Login() {
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
      const res = await fetch( `${import.meta.env.VITE_API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.token) {
          localStorage.setItem("token", data.token);
        } else {
          console.log("TOKEN MISSING FROM BACKEND");
        }

        navigate("/");
      } else {
        swal.fire({
          text: data.message,
          timer: 2000,
          width: "fit-content",
          showConfirmButton: false
        });
      }

    } catch (error) {
      swal.fire({
        title: "Error",
        width: "fit-content",
        text: "Server Error",
        icon: "error"
      });
    }
  };

  return (
    <div className="login-card">
      <h2>Login</h2>

      <label>Name</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <label>Mobile</label>
      <input
        type="text"
        name="mobile"
        value={form.mobile}
        onChange={handleChange}
        required
      />

      <label>Password</label>
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button onClick={handleSubmit}>Login</button>
        <p>if you are not Register then <Link to="/register">Register</Link> </p>
    </div>
  );
}

export default Login;