import { Route, Routes } from "react-router";
import Home from "./views/Home.jsx";
import Registro from "./views/Registro.jsx";
import Login from "./views/Login.jsx";
import Profile from "./views/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import GuestRoute from "./components/GuestRoute.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registro"
          element={
            <GuestRoute>
              <Registro />
            </GuestRoute>
          }
        />{" "}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
