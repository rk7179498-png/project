import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./1_signup/signup";
import Login from "./1_signup/login";
import Frogot from "./1_signup/forgotpass";
import { useSelector } from "react-redux";
import Home from "./1_signup/home";
import CurrentUserComponent from "./4_current.user.jsx/userGetCurrentUser";
import UserGatecity from "./4_current.user.jsx/userGatecity";
import EditOwnerPage from "./6_page/editOwnerPage";
import Owner from "./5_role.user.jsx/owner";

export const server = "http://localhost:7000";

function App() {
  const { userData,myCity , myAddress} = useSelector((state) => state.user);
  CurrentUserComponent()
  UserGatecity()
  console.log(myCity);
  console.log(myAddress)
  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <Signup /> : <Navigate to="/" replace />}
      />
      <Route
        path="/login"
        element={!userData ? <Login /> : <Navigate to="/" replace />}
      />
      <Route
        path="/forgot-password"
        element={!userData ? <Frogot /> : <Navigate to="/" replace />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/create_edit_shop"
        element={userData ? <EditOwnerPage /> : <Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default App;
