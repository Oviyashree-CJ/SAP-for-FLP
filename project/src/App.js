import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import SubjectInput from "./pages/selectSub";
import Auth from "./pages/auth";
import ForgotPassword from "./components/forgotPassword";
import Home from "./pages/home";
import CustomNavbar from "./components/navbar";
import ProfilePage from "./pages/profile";
import Footer from "./components/footer";
import FocusTracker from "./context/FocusTracker";
import Scheduler from "./pages/scheduler";
import LogoutConfirmation from "./pages/logoutConfirmation";

function App() {
  return (
    <Router>
      <FocusTracker />

      <div className="app-container flex flex-col min-h-screen">
        <div className="flex-grow main-content">
          <Routes>
            {/* Navigate root to auth page */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/navbar" element={<CustomNavbar />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/select-sub" element={<SubjectInput />} /> 
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/scheduler" element={<Scheduler />} />
            <Route path="/logout-confirmation" element={<LogoutConfirmation />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>

  );
}

export default App;
