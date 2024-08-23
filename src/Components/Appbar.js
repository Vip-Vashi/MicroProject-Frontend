import React, { useState, useEffect } from "react";
import { Link, useLocation ,useNavigate} from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [userProfile, setUserProfile] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8000/users/" + sessionStorage.getItem("userid"))
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);
  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    navigate('/login', { replace: true }); // Redirect to login page
};
  useEffect(() => {
    // Prevent user from accessing certain pages after logout
    if (location.pathname !== '/login') {
        sessionStorage.setItem('redirectAfterLogin', location.pathname);
    }
}, [location]);

  

  const isActive = (path) => {
    return location.pathname === path
      ? "text-cyan-400 font-bold"
      : "text-white";
  };

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          `AAA` Online Bidding System
        </Link>
        <nav className="flex items-center space-x-4">
          <Link
            to="/userprod"
            className={`text-cyan mr-4 ${isActive("/userprod")}`}
          >
            Products
          </Link>
          <Link
            to="/userauct"
            className={`text-cyan mr-4 ${isActive("/userauct")}`}
          >
            Auctions
          </Link>
          <Link
            to="/"
            className="text-white mr-4"
            onClick= { handleLogout}
          >
            LogOut ⬅
          </Link>
          <div className="flex items-center space-x-2">
            <div className="bg-gray-500 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center">
              {userProfile.username
                ? userProfile.username.charAt(0).toUpperCase()
                : "U"}
            </div>
            <span className="text-white">{userProfile.username}</span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
