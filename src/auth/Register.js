import React, { useContext, useState } from "react";
import { POST_REQUEST_TYPES } from "../utils/constants";
import { postRequest } from "../api/apiCalls";
import ResponseContext from "../context/ResponseContext";
import { Link, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { storeError, toggleError, isLoading, toggleLoading } =
    useContext(ResponseContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !name) {
      toggleError(true);
      storeError("Please fill all fields");
    }
    if (password !== confirmPassword) {
      toggleError(true);
      storeError("Both Passwords should Match");
    }
    toggleLoading(true);
    toggleError(false);
    const res = await postRequest({
      path: "users/register",
      reqBody: {
        email,
        password,
        confirmPassword,
        name,
      },
      setError: storeError,
      setIsError: toggleError,
      reqType: POST_REQUEST_TYPES.auth,
    });

    if (res?.status) {
      navigate("/");
      localStorage.setItem("userInfo", JSON.stringify(res?.data?.userDetails));
      setEmail("");
      setName("");
      setPassword("");
      setConfirmPassword("");
    } else {
      setPassword("");
      setConfirmPassword("");
      toggleError(true);
      storeError(res?.message);
    }
    toggleLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Register</h2>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
      <div className="form-group">
        <label>Confirm Password:</label>
        <div className="password-input">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            className="password-toggle-icon"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? "hide" : "show"}
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
          "Register"
        )}
      </button>
      <p className="navigation-text">
        Already Have An Account?
        <Link to="/login">Login Here</Link>
      </p>
    </form>
  );
};

export default Register;
