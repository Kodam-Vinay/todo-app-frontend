import { Navigate } from "react-router-dom";

const DataProtectedRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo?.token ? children : <Navigate to="/login" />;
};

export default DataProtectedRoute;
