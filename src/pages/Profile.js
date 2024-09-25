import React, { useContext, useState } from "react";
import { POST_REQUEST_TYPES } from "../utils/constants";
import { postRequest, updateRequest } from "../api/apiCalls";
import ResponseContext from "../context/ResponseContext";
import { Oval } from "react-loader-spinner";

const Profile = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [name, setName] = useState(userInfo?.name); // Assume initial values are fetched from an API
  const [email, setEmail] = useState(userInfo?.email);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    storeError,
    toggleError,
    isLoading,
    toggleLoading,
    storeSuccess,
    toggleSuccess,
  } = useContext(ResponseContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (!email || !password || !name) {
      toggleError(true);
      storeError("Please fill all fields");
      return;
    }

    toggleLoading(true);

    const res = await updateRequest({
      path: "users/update", // Assuming the API path to update profile
      reqBody: {
        email,
        password,
        name,
      },
      setError: storeError,
      setIsError: toggleError,
      reqType: POST_REQUEST_TYPES.create,
      token: userInfo?.token,
    });

    if (res?.status) {
      // Profile updated successfully
      localStorage.setItem("userInfo", JSON.stringify(res?.data?.userDetails));
      setPassword("");
      toggleSuccess(true);
      toggleError(false);
      storeSuccess(res?.message);
    } else {
      setPassword("");
      toggleError(true);
      toggleSuccess(false);
      storeError(res?.message);
    }

    toggleLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Profile</h2>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
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
          "Update Profile"
        )}
      </button>
    </form>
  );
};

export default Profile;
