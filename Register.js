import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Register() {
  const [employeename, setEmployeename] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8082/api/v1/employees/save", {
        employeename: employeename,
        email: email,
        password: password,
      }, {
        timeout: 10000, // Adjust timeout as needed, in milliseconds
      });
      alert("Employee Registration Successful! Now add your details");
      navigate('/addEmployee');
    } catch (err) {
      if (err.response) {
        // Server responded with a non-2xx status
        alert("Error: " + err.response.data.message); // Adjust error message handling as per your API response structure
      } else if (err.request) {
        // No response received, likely a network error
        alert("Network Error: Could not connect to server.");
      } else {
        // Something happened in setting up the request
        alert("Error: " + err.message);
      }
    }
  }

  return (
    <div>
      <div className="container mt-4">
        <div className="card">
          <h1>Employee Registration</h1>

          <form>
            <div className="form-group">
              <label>Employee name</label>
              <input
                type="text"
                className="form-control"
                id="employeename"
                placeholder="Enter Name"
                value={employeename}
                onChange={(event) => {
                  setEmployeename(event.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary mt-4" onClick={save}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
