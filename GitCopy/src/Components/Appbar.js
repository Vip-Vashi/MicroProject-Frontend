// import React, { useState, useEffect } from "react";
// import { Link, useLocation ,useNavigate} from "react-router-dom";
// import axios from "axios";

// const Header = () => {
//   const [userProfile, setUserProfile] = useState([]);
//   const location = useLocation();
//   const navigate = useNavigate();
//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/users/" + sessionStorage.getItem("userid"))
//       .then((response) => {
//         setUserProfile(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user profile:", error);
//       });
//   }, []);
//   const handleLogout = () => {
//     sessionStorage.clear(); // Clear session storage
//     navigate('/login', { replace: true }); // Redirect to login page
// };
//   useEffect(() => {
//     // Prevent user from accessing certain pages after logout
//     if (location.pathname !== '/login') {
//         sessionStorage.setItem('redirectAfterLogin', location.pathname);
//     }
// }, [location]);

  

//   const isActive = (path) => {
//     return location.pathname === path
//       ? "text-cyan-400 font-bold"
//       : "text-white";
//   };

//   return (
//     <header className="bg-gray-800 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-white text-2xl font-bold">
//           `AAA` Online Bidding System
//         </Link>
//         <nav className="flex items-center space-x-4">
//           <Link
//             to="/userprod"
//             className={`text-cyan mr-4 ${isActive("/userprod")}`}
//           >
//             Products
//           </Link>
//           <Link
//             to="/userauct"
//             className={`text-cyan mr-4 ${isActive("/userauct")}`}
//           >
//             Auctions
//           </Link>
//           <Link
//             to="/"
//             className="text-white mr-4"
//             onClick= { handleLogout}
//           >
//             LogOut ⬅
//           </Link>
//           <div className="flex items-center space-x-2">
//             <div className="bg-gray-500 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center">
//               {userProfile.username
//                 ? userProfile.username.charAt(0).toUpperCase()
//                 : "U"}
//             </div>
//             <span className="text-white">{userProfile.username}</span>
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [userProfile, setUserProfile] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${sessionStorage.getItem("userid")}`)
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);
  useEffect(() => {
      
        if (location.pathname !== '/login') {
            sessionStorage.setItem('redirectAfterLogin', location.pathname);
        }
    }, [location]);
  const handleLogout = () => {
    sessionStorage.clear(); 
    navigate('/login', { replace: true }); 
  };

  const isActive = (path) => {
    return location.pathname === path
      ? "text-cyan-400 font-bold"
      : "text-white";
  };

  return (
    <>
      <header className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
        <img src='https://irp.cdn-website.com/27143412/dms3rep/multi/Atterberry-Symbol---3-Color.png'
               width={120} 
               height={50}
               className="flex"/>
          <Link to="/" className="text-white text-2xl font-bold">
          
            `AAA` Online Bidding System
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to="/userprod"
              className={`text-cyan-400 mr-4 ${isActive("/userprod")}`}
            >
              Products
            </Link>
            <Link
              to="/userauct"
              className={`text-cyan-400 mr-4 ${isActive("/userauct")}`}
            >
              Auctions
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center space-x-2 text-white"
            >
              <div className="bg-gray-500 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center">
                {userProfile.username
                  ? userProfile.username.charAt(0).toUpperCase()
                  : "U"}
              </div>
              <span className="text-white">{userProfile.username}</span>
            </button>
          </nav>
          <button
            onClick={handleLogout}
            className="md:hidden text-white flex items-center space-x-2"
          >
            <span>LogOut</span>
            <span>⬅</span>
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-74 bg-gray-800 text-white h-full shadow-lg transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}
      >
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold">User Details</h2>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
        <div className="p-2">
          <div className="flex items-center mb-4">
            <div className="bg-gray-500 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center">
              {userProfile.username
                ? userProfile.username.charAt(0).toUpperCase()
                : "U"}
            </div>
            <div className="ml-1">
              <h3 className="text-xl font-semibold ">{userProfile.username} </h3>
             
              <p className="text-gray-400 font-semibold ">{userProfile.email}</p>
              
           
            </div>
        
          </div>
          <div className="ml-6">
            
              <h3 className="text mb-2 ">Mobile :       {userProfile.contact}</h3>
              <p className="text">Address:  {userProfile.address}</p>
            </div>
        <hr>
        </hr>
        <br></br>
        <br></br>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            LogOut
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
