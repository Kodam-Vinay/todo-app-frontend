import { Navigate } from "react-router-dom";

const AuthProtectedRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return !userInfo?.token ? children : <Navigate to="/" />;
};

export default AuthProtectedRoute;
