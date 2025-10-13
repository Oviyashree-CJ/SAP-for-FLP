import { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FaCoins, FaAward, FaUserCircle } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
//import API from "../services/api";

const CustomNavbar = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  //const [points, setPoints] = useState(0);

  // useEffect(() => {
  //   const fetchRewards = async () => {
  //     try {
  //       const res = await API.get("/api/rewards", { withCredentials: true }); 
  //       // session cookie will be sent automatically
  //       if (res.data?.points !== undefined) {
  //         setPoints(res.data.points);
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch rewards:", err);
  //     }
  //   };

  //   fetchRewards();
  // }, []);

  if (["/auth", "/auth/login", "/auth/signup"].includes(location.pathname)) {
    return null;
  }

  return (
    <Navbar expand="lg" className="px-3 shadow-lg">
      <Navbar.Brand as={Link} to="/" 
        style={{
          fontFamily: "'Dancing Script', cursive", // pick any Google Font
          fontWeight: "900",
          fontSize: "28px",
          color: "#ad11b8ff"
      }}>
        dotLearn
      </Navbar.Brand>

      <div className="ms-auto d-flex gap-3 align-items-center">
        <div className="text-center">
          <FaCoins size={24} />
          <div style={{ fontSize: "12px" }}>Points: {user?.points || 0} </div>
        </div>
        <div className="text-center">
          <FaAward size={24} />
          <Link to="/badges" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ fontSize: "12px", cursor: "pointer" }}>Badges</div>
          </Link>
        </div>
        <div className="text-center">
          <Nav.Link as={Link} to="/profile" className="d-flex flex-column align-items-center text-center">
            <FaUserCircle size={28} />
            <small>{user ? user.username : "Profile"}</small>
          </Nav.Link>


        </div>
      </div>
      
    </Navbar>
  );
};

export default CustomNavbar;
