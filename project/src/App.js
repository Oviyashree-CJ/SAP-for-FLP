import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Auth from "./pages/auth";
import ForgotPassword from "./components/forgotPassword";
import Home from "./pages/home";
import CustomNavbar from "./components/navbar";
import ProfilePage from "./pages/profile";
import Footer from "./components/footer";
import FocusTracker from "./context/FocusTracker";
import Scheduler from "./pages/scheduler";
import Logout from "./pages/signout";
import Chatbot from "./pages/chatBot";
import Course from "./pages/courses";
import ErrorBoundary from "./ErrorBoundary";
import Badges from "./pages/badges";
import RelaxationPage from "./pages/relaxPage";
import ViewProgress from "./components/viewProgress";

function App() {
  return (
    <ErrorBoundary>

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
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/scheduler" element={<Scheduler />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/course" element={<Course />} />
              <Route path="/badges" element={<Badges />} />
              <Route path="/relax" element={<RelaxationPage />} />
              <Route path="/view-progress" element={<ViewProgress />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>

  );
}

export default App;
