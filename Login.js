import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8082/api/v1/employees/login", {
                email: email,
                password: password,
            });
            console.log(response.data);

            if (response.data.message === "Email not exits") {
                alert("Email not exists");
            } else if (response.data.message === "Login Success") {
                navigate('/addEmployee');
            } else {
                alert("Incorrect Email and Password not match");
            }
        } catch (err) {
            if (err.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                console.error('Response error:', err.response.data);
                console.error('Response status:', err.response.status);
                console.error('Response headers:', err.response.headers);
                alert(`An error occurred: ${err.response.data.message || 'Unknown error'}`);
            } else if (err.request) {
                // The request was made but no response was received
                console.error('Request error:', err.request);
                alert('No response from the server. Please try again later.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', err.message);
                alert('An error occurred. Please try again later.');
            }
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <h2>Login</h2>
                    <hr />
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <form onSubmit={login}>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
