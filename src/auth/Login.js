import React, { useContext, useState } from "react";
import { POST_REQUEST_TYPES } from "../utils/constants";
import { postRequest } from "../api/apiCalls";
import ResponseContext from "../context/ResponseContext";
import { Link, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { storeError, toggleError, isLoading, toggleLoading } =
    useContext(ResponseContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toggleError(true);
      storeError("Please fill all fields");
    }
    toggleLoading(true);

    const res = await postRequest({
      path: "users/login",
      reqBody: {
        email,
        password,
      },
      setError: storeError,
      setIsError: toggleError,
      reqType: POST_REQUEST_TYPES.auth,
    });
    if (res?.status) {
      navigate("/");
      localStorage.setItem("userInfo", JSON.stringify(res?.data?.userDetails));
      setEmail("");
      setPassword("");
    } else {
      setPassword("");
      toggleError(true);
      storeError(res?.message);
    }
    toggleLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Login</h2>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="password-toggle-icon"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "hide" : "show"}
          </span>
        </div>
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? (
          <Oval
            visible={true}
            height="20"
            width="20"
            color="#4fa94d"
            ariaLabel="oval-loading"
          />
        ) : (
          "Login"
        )}
      </button>
      <p className="navigation-text">
        Not a Member?
        <Link to="/register">Register Here</Link>
      </p>
    </form>
  );
};

export default Login;
