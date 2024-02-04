import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { AuthContext } from "./context/auth_context";
import { userDetails } from './source/form_source';
import { useContext } from "react";
import Login from "./authentication/login";
import Home from "./home";
import Signup from "./authentication/signup";
import UserHistory from "./components/userHistory";


function App() {
  const { currentUser } = useContext(AuthContext);
  const RequiredAuth = ({ children }) => {
    return currentUser ? children : <Navigate to={"/login"} />;
  };
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequiredAuth>
                <Home />
              </RequiredAuth>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profile"
            element={
              <RequiredAuth>
                <UserHistory />
              </RequiredAuth>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
