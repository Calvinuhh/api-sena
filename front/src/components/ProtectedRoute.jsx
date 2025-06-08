import { Navigate } from "react-router-dom";

const isTokenExpired = () => {
  const expirationTime = localStorage.getItem("tokenExpiration");

  if (!expirationTime) {
    return true;
  }

  return Date.now() > parseInt(expirationTime);
};

const clearExpiredData = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("tokenExpiration");
};

export default function ProtectedRoute({ children }) {
  const userToken = localStorage.getItem("userToken");

  if (!userToken || isTokenExpired()) {
    clearExpiredData();
    return <Navigate to="/login" replace />;
  }

  return children;
}
