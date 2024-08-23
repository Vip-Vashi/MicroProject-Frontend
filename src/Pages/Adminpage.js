import React from 'react'
import AdminNav from '../Components/AdminNav'
import Corosel from '../Components/Corosel'
import { Link } from 'react-router-dom'
// import AdminDashboard from './Admin'
// import AdminWinnings from './Winnings'

function Adminpage() {
  return (
    <>
     <AdminNav/>
     
    <Corosel/>
    <div className="bg-gradient-to-r from-gray-800 to-gray-800 text-white py-16">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold">Admin Auction Dashboard</h1>
                <p className="mt-4 text-lg">Manage, monitor, and optimize your auctions with ease.</p>
                <Link to="/Adminauction" className="mt-6 inline-block bg-blue-500 text-gray-100 py-2 px-4 rounded hover:bg-blue-900">
                    View Auctions
                </Link>
            </div>
        </div>
    <div className="bg-gray-800 text-white p-6 text-center">
            <h3 className="text-xl font-bold">Manage Your Auctions Efficiently</h3>
            <p className="mt-2">Create new auctions, manage existing ones, and review auction analytics all in one place.</p>
            <div className="mt-4">
                <Link to="/Adminprod">
                    <button className="bg-yellow-500 text-gray-800 py-2 px-4 rounded hover:bg-yellow-400">
                        Create New Auction
                    </button>
                </Link>
                <Link to="/Adminauction" className="ml-4">
                    <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400">
                        View Analytics
                    </button>
                </Link>
            </div>
        </div>

        <div className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex-1">
                    {/* <h2 className="text-2xl font-bold">Welcome to the Auction Management System</h2> */}
                    <p className="mt-2 font-bold">Stay updated with the latest auctions and manage them seamlessly.</p>
                </div>
                <Link to="/auction-help" className="text-yellow-300 underline">
                    Need Help?
                </Link>
            </div>
        </div>
    <footer className="bg-gray-800 text-white py-4 ">
                    <div className="container mx-auto text-center">
                        <p>&copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.</p>
                        <p className="mt-2">
                            <Link to="/privacy" className="text-gray-400 hover:text-gray-300">Privacy Policy</Link> | 
                            <Link to="/terms" className="text-gray-400 hover:text-gray-300 ml-2">Terms of Service</Link>
                        </p>
                    </div>
                </footer>
    </>
  )
}

export default Adminpage
