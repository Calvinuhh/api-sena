import { Navigate } from "react-router-dom";

const isTokenExpired = () => {
  const expirationTime = localStorage.getItem("tokenExpiration");

  if (!expirationTime) {
    return true;
  }

  return Date.now() > parseInt(expirationTime);
};

export default function GuestRoute({ children }) {
  const userToken = localStorage.getItem("userToken");

  if (userToken && !isTokenExpired()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
