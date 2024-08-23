import React from 'react'
import Home from './Home'
import {  useLocation, Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './Login';
import RegistrationPage from './Signup';
import AdminDashboard from './Pages/Admin';
import Admin from './Pages/Admin';
import Landing from './Pages/Landing';
import UserAuctionPage from './Pages/UserAuctionPage'
// import AdminDashboard from './Pages/Admin';
// import UpdateAuction from './Pages/UpdateAuction';
// import ViewAuction from './Pages/ViewAuction';
// import AdminWinnings from './Pages/Winnings';
import Adminpage from './Pages/Adminpage';
import ProductAuction from './Pages/ProductAuction';
import AdminProductPage from './Pages/AdminProductPage';
import AdminWinnings from './Pages/Winnings';
// import AdminProductPage from './Pages/AdminProductPage';
// import UserPage from './Pages/UserAuction';
// import UserAuctionDashboard from './Pages/UserProdDash';
// import UserAuctionPage from './Pages/UserAuctionDash';
// import ProductAuction from './Pages/ProductAuction';


function Approuter() {
  return (
    <>
     <Router>
        
        
        <Routes>
          
        <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<LoginForm/>}></Route>
          
          <Route path="/register" element={<RegistrationPage/>}></Route>
          <Route path="/AdminDashboard" element={<Adminpage/>}></Route>
          <Route path="/HomePage" element={<Landing/>}></Route>
          <Route path="/userprod" element={<ProductAuction/>}/>
          <Route path="/Adminprod" element={<AdminProductPage/>}></Route>
          <Route path="/Adminauction" element={<Admin/>}></Route>
          <Route path="/userauct" element={<UserAuctionPage/>}/>
          <Route path="/winning" element={<AdminWinnings/>}/>
          {/* 
          <Route path="/Adminauction" element={<Admin/>}></Route>
          
         Adminauction
          <Route path="/Wins" element={<AdminWinnings/>}></Route>
          
          <Route path="/update-auction/:auctionId" element={<UpdateAuction/>} />
          <Route path="/view-auction/:auctionId" element={<ViewAuction/>} />
          <Route path="/userauction" element={<UserPage/>}/>

          
           */}
          {/* <Route path="/admin" element={<ProdCrud/>}></Route> */}


        </Routes>
        
        
        
        </Router> 
    </>
  )
}

export default Approuter
