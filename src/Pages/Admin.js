// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import AdminNav from '../Components/AdminNav';
// import AdminWinnings from './Winnings';

// const AdminDashboard = () => {
//     const [auctions, setAuctions] = useState([]);

// const navigate = useNavigate();
//     useEffect(() => {
//         const fetchAuctions = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/products/all');
//                 setAuctions(response.data);
//                 console.log(auctions);


//             } catch (error) {
//                 console.error('Error fetching auctions:', error);
//             }
//         };

//         fetchAuctions();
//     }, []);
//     // useEffect(() => {
//     //     auctions.forEach(auction => {
//     //         fetchHighestBid(auction.auctionId);
//     //     });
//     // }, [auctions]);

//     const [highestBids, setHighestBids] = useState({});
    
//     const handleEndAuction = async (auctionId) => {
//         try {
//             const winner ={
                
//                 "product":{
//                     "productId":auctionId,
                    
//                 }
            
//             }
//             console.log(winner);
//             await axios.post(`http://localhost:8000/winners`,winner);
//             alert('Auction ended successfully.');
//             setAuctions(auctions.map(auction => 
//                 auction.id === auctionId ? { ...auction, status: 'Ended' } : auction
//             ));
//         } catch (error) {
//             console.error('Error ending auction:', error);
//         }
//     };

   
//     return (
//         <>
//         <AdminNav/>
//         <div className="container mx-auto p-4">
         

// <h2 className="text-2xl font-bold mb-4" role='header'>Admin Dashboard - Manage Auctions</h2>
//             <div className="overflow-x-auto">
//                 <table className="max-w-full bg-white border" role='tables'>
//                     <thead>
//                         <tr>
//                             <th className="py-2 px-4 border-b" role='Auction ID'>Auction ID</th>
//                             <th className="py-2 px-4 border-b" role='Product Name'>Product Name</th>
//                             <th className="py-2 px-4 border-b" role='Starting Price'>Starting Price</th>
//                             <th className="py-2 px-4 border-b" role='Current Highest Bid'>Current Highest Bid</th>
//                             <th className="py-2 px-4 border-b" role='End Date'>End Date</th>
//                             <th className="py-2 px-4 border-b" role='Status'>Status</th>
//                             <th className="py-2 px-4 border-b" role='Actions'>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {auctions.map(auction => (
//                             <tr key={auction.productId}>
//                                 <td className="py-2 px-4 border-b">{auction.productId}</td>
//                                 <td className="py-2 px-4 border-b">{auction.name}</td>
//                                 <td className="py-2 px-4 border-b">${auction.startingPrice}</td>
                              
//                                      <td className="py-2 px-4 border-b">${auction.currentBiddingPrice}</td>
//                                 <td className="py-2 px-4 border-b">{auction.endTimeDate}</td>
//                                 <td className="py-2 px-4 border-b">{auction.productstatus}</td>
//                                 <td className="py-2 px-4 w-max border-b">
//                                     <button
//                                         role='End'
//                                         onClick={() => handleEndAuction(auction.productId)}
//                                         className="bg-red-500 text-white py-1 px-2 rounded mr-2 flex"
//                                     >
//                                         End
//                                     </button>
                                   
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>


//         </div>
//         <hr></hr>
//         <AdminWinnings/>
//         </>
//     );
// };

// export default AdminDashboard;

//******************************************************************************/
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import AdminNav from '../Components/AdminNav';
// import AdminWinnings from './Winnings';

// const AdminDashboard = () => {
//     const [auctions, setAuctions] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(7); 

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchAuctions = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/products/all');
//                 setAuctions(response.data);
//                 console.log(response.data);
//             } catch (error) {
//                 console.error('Error fetching auctions:', error);
//             }
//         };

//         fetchAuctions();
//     }, []);

//     const [highestBids, setHighestBids] = useState({});

//     const handleEndAuction = async (auctionId) => {
//         try {
//             const winner = {
//                 "product": {
//                     "productId": auctionId,
//                 }
//             };
//             console.log(winner);
//             await axios.post(`http://localhost:8000/winners`, winner);
//             alert('Auction ended successfully.');
//             setAuctions(auctions.map(auction =>
//                 auction.productId === auctionId ? { ...auction, status: 'Ended' } : auction
//             ));
//         } catch (error) {
//             console.error('Error ending auction:', error);
//         }
//     };

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentAuctions = auctions.slice(indexOfFirstItem, indexOfLastItem);

    
//     const totalPages = Math.ceil(auctions.length / itemsPerPage);

//     return (
//         <>
//             <AdminNav />
//             <div className="container mx-auto p-4">
//                 <h2 className="text-2xl font-bold mb-4" role='header'>Admin Dashboard - Manage Auctions</h2>
//                 <Link to={'/winning'}>
//             <button  className="mb-4 bg-blue-800 text-gray-100 py-2 px-4 rounded ">
//                         View Winners
//                     </button>
//             </Link>
//                 <div className="overflow-x-auto">
//                     <table className="max-w-full bg-white border" role='tables'>
//                         <thead>
//                             <tr>
//                                 <th className="py-2 px-4 border-b" role='Auction ID'>Auction ID</th>
//                                 <th className="py-2 px-4 border-b" role='Product Name'>Product Name</th>
//                                 <th className="py-2 px-4 border-b" role='Starting Price'>Starting Price</th>
//                                 <th className="py-2 px-4 border-b" role='Current Highest Bid'>Current Highest Bid</th>
//                                 <th className="py-2 px-4 border-b" role='End Date'>End Date</th>
//                                 <th className="py-2 px-4 border-b" role='Status'>Status</th>
//                                 <th className="py-2 px-4 border-b" role='Actions'>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentAuctions.map(auction => (
//                                 <tr key={auction.productId}>
//                                     <td className="py-2 px-4 border-b">{auction.productId}</td>
//                                     <td className="py-2 px-4 border-b">{auction.name}</td>
//                                     <td className="py-2 px-4 border-b">${auction.startingPrice}</td>
//                                     <td className="py-2 px-4 border-b">${auction.currentBiddingPrice}</td>
//                                     <td className="py-2 px-4 border-b">{auction.endTimeDate}</td>
//                                     <td className="py-2 px-4 border-b">{auction.productstatus}</td>
//                                     <td className="py-2 px-4 w-max border-b">
//                                         <button
//                                             role='End'
//                                             onClick={() => handleEndAuction(auction.productId)}
//                                             className="bg-red-500 text-white py-1 px-2 rounded mr-2 flex"
//                                         >
//                                             End
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

               
//                 <div className="mt-4 flex justify-between items-center">
//                     <button
//                         className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
//                         onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                         disabled={currentPage === 1}
//                     >
//                         Previous
//                     </button>
//                     <span>Page {currentPage} of {totalPages}</span>
//                     <button
//                         className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
//                         onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                         disabled={currentPage === totalPages}
//                     >
//                         Next
//                     </button>
//                 </div>
//             </div>
//             <hr />
          
           
//             {/* <AdminWinnings /> */}
//         </>
//     );
// };

// export default AdminDashboard;

//////////////Final Version //////////////////////////////////////////////////////

// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import AdminNav from '../Components/AdminNav';
// import UserDetailsModal from './UserDetailsModal';
// import { FaRupeeSign } from 'react-icons/fa';
// import Swal from 'sweetalert2';
// const AdminDashboard = () => {
//     const [auctions, setAuctions] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(7);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [viewModalOpen, setViewModalOpen] = useState(false);
//     const [currentTime, setCurrentTime] = useState(new Date());

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchAuctions = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/products/all');
//                 setAuctions(response.data);
//             } catch (error) {
//                 console.error('Error fetching auctions:', error);
//             }
//         };

//         fetchAuctions();

//         const intervalId = setInterval(() => {
//             setCurrentTime(new Date());
//         }, 1000);

//         return () => clearInterval(intervalId);
//     }, []);

//     const handleEndAuction = async (auctionId) => {
//         try {
//             const winner = {
//                 "product": {
//                     "productId": auctionId,
//                 }
//             };
//          const response =   await axios.post(`http://localhost:8000/winners`, winner);
//          console.log(response.data);
//          await axios.post('http://localhost:8000/winners/sendmail',response.data)
//          console.log("HELLO");
//         //  alert('Auction ended successfully, Email Notification sent to Winner');
//          Swal.fire({
//             title: 'Success!',
//             text: 'Auction ended successfully, Email Notification sent to Winner',
//             icon: 'success',
//             confirmButtonText: 'OK'
//           });

//             setAuctions(auctions.map(auction =>
//                 auction.productId === auctionId ? { ...auction, status: 'Ended' } : auction
//             ));
//         } catch (error) {
//             console.error('Error ending auction:', error);
//         }
//     };

//     const handleViewUserDetails = async (auctionId) => {
//         try {
//             const response = await axios.get(`http://localhost:8000/products/${auctionId}`);
//             const highestBidderId = response.data.user.uid;
//             const userResponse = await axios.get(`http://localhost:8000/users/${highestBidderId}`);
//             setSelectedUser(userResponse.data);
//             setViewModalOpen(true);
//         } catch (error) {
//             console.error('Error fetching user details:', error);
//         }
//     };

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentAuctions = auctions.slice(indexOfFirstItem, indexOfLastItem);

//     const totalPages = Math.ceil(auctions.length / itemsPerPage);

//     return (
//         <>
//             <AdminNav />
//             <div className="container mx-auto p-4">
//                 <h2 className="text-2xl font-bold mb-4" role='header'>Admin Dashboard - Manage Auctions</h2>
//                 <Link to={'/winning'}>
//                     <button className="mb-4 bg-blue-800 text-gray-100 py-2 px-4 rounded">
//                         View Winners
//                     </button>
//                 </Link>
//                 <div className="overflow-x-auto">
//                     <table className="max-w-full bg-white border" role='tables'>
//                         <thead>
//                             <tr>
//                                 <th className="py-2 px-4 border-b" role='Auction ID'>Auction ID</th>
//                                 <th className="py-2 px-4 border-b" role='Product Name'>Product Name</th>
//                                 <th className="py-2 px-4 border-b" role='Starting Price'>Starting Price</th>
//                                 <th className="py-2 px-4 border-b" role='Current Highest Bid'>Current Highest Bid</th>
//                                 <th className="py-2 px-4 border-b" role='End Date'>End Date</th>
//                                 <th className="py-2 px-4 border-b" role='Status'>Status</th>
//                                 <th className="py-2 px-4 border-b" role='Actions'>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentAuctions.map(auction => (
//                                 <tr key={auction.productId}>
//                                     <td className="py-2 px-4 border-b">{auction.productId}</td>
//                                     <td className="py-2 px-4 border-b">{auction.name}</td>
//                                     <td className="py-2 px-4 border-b">RS: {auction.startingPrice}</td>
//                                     <td className="py-2 px-4 border-b">RS: {auction.currentBiddingPrice}</td>
//                                     <td className="py-2 px-4 border-b">{auction.endTimeDate}</td>
//                                     <td className="py-2 px-4 border-b">{auction.productstatus}</td>
//                                     <td className="py-2 px-4 w-max border-b">
//                                     {/* <div className="flex space-x-4"> */}
//                                             <button
//                                                 role='View'
//                                                 onClick={() => handleViewUserDetails(auction.productId)}
//                                                 className="bg-blue-500 text-white  py-1 px-2 rounded mr-2 pb-2 mb-3"
//                                             >
//                                                 View Highest Bidder  
//                                             </button>
//                                             <button
//                                                 role='End'
//                                                 onClick={() => handleEndAuction(auction.productId)}
//                                                 className="bg-green-500 text-white py-1 px-4  pb-2 rounded "
//                                                 disabled={new Date(auction.endTimeDate) > currentTime}
//                                             >
//                                                 Approve Winner
//                                             </button>
//                                         {/* </div> */}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 <div className="mt-4 flex justify-between items-center">
//                     <button
//                         className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
//                         onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                         disabled={currentPage === 1}
//                     >
//                         Previous
//                     </button>
//                     <span>Page {currentPage} of {totalPages}</span>
//                     <button
//                         className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
//                         onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                         disabled={currentPage === totalPages}
//                     >
//                         Next
//                     </button>
//                 </div>
//             </div>

//             <UserDetailsModal
//                 user={selectedUser}
//                 isOpen={viewModalOpen}
//                 onClose={() => setViewModalOpen(false)}
//             />
//         </>
//     );
// };

// export default AdminDashboard;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminNav from '../Components/AdminNav';
import UserDetailsModal from './UserDetailsModal';
import BiddingModal from './BiddingModal';  // Import the new BiddingModal component
import { FaRupeeSign } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
    const [auctions, setAuctions] = useState([]);
    const [bids, setBids] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(7);
    const [selectedUser, setSelectedUser] = useState(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [biddingModalOpen, setBiddingModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/products/all');
                setAuctions(response.data);
            } catch (error) {
                console.error('Error fetching auctions:', error);
            }
        };

        const fetchBids = async () => {
            try {
                const response = await axios.get('http://localhost:8000/biddings/all');
                setBids(response.data);
            } catch (error) {
                console.error('Error fetching bids:', error);
            }
        };

        fetchAuctions();
        fetchBids();

        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleEndAuction = async (auctionId) => {
        try {
            const winner = {
                "product": {
                    "productId": auctionId,
                }
            };
            const response = await axios.post(`http://localhost:8000/winners`, winner);
            await axios.post('http://localhost:8000/winners/sendmail', response.data);

            Swal.fire({
                title: 'Success!',
                text: 'Auction ended successfully, Email Notification sent to Winner',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            setAuctions(auctions.map(auction =>
                auction.productId === auctionId ? { ...auction, status: 'Ended' } : auction
            ));
        } catch (error) {
            console.error('Error ending auction:', error);
        }
    };

    const handleViewUserDetails = async (auctionId) => {
        try {
            const response = await axios.get(`http://localhost:8000/products/${auctionId}`);
            const highestBidderId = response.data.user.uid;
            const userResponse = await axios.get(`http://localhost:8000/users/${highestBidderId}`);
            setSelectedUser(userResponse.data);
            setViewModalOpen(true);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleViewBidding = (auctionId) => {
        setSelectedProduct(auctionId);
        setBiddingModalOpen(true);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAuctions = auctions.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(auctions.length / itemsPerPage);

    return (
        <>
            <AdminNav />
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4" role='header'>Admin Dashboard - Manage Auctions</h2>
                <Link to={'/winning'}>
                    <button className="mb-4 bg-blue-800 text-gray-100 py-2 px-4 rounded">
                        View Winners
                    </button>
                </Link>
                <div className="overflow-x-auto">
                    <table className="max-w-full bg-white border" role='tables'>
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Auction ID</th>
                                <th className="py-2 px-4 border-b">Product Name</th>
                                <th className="py-2 px-4 border-b">Starting Price</th>
                                <th className="py-2 px-4 border-b">Current Highest Bid</th>
                                <th className="py-2 px-4 border-b">End Date</th>
                                <th className="py-2 px-4 border-b">Status</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAuctions.map(auction => (
                                <tr key={auction.productId}>
                                    <td className="py-2 px-4 border-b">{auction.productId}</td>
                                    <td className="py-2 px-4 border-b">{auction.name}</td>
                                    <td className="py-2 px-4 border-b">RS: {auction.startingPrice}</td>
                                    <td className="py-2 px-4 border-b">RS: {auction.currentBiddingPrice}</td>
                                    <td className="py-2 px-4 border-b">{auction.endTimeDate}</td>
                                    <td className="py-2 px-4 border-b">{auction.productstatus}</td>
                                    <td className="py-2 px-4 w-max border-b">
                                        <button
                                            onClick={() => handleViewUserDetails(auction.productId)}
                                            className="bg-blue-500 text-white py-1 px-2 rounded mr-2 mb-3"
                                        >
                                            View Highest Bidder
                                        </button>
                                        <button
                                            onClick={() => handleViewBidding(auction.productId)}
                                            className="bg-purple-500 text-white py-1 px-2 rounded mr-2 mb-3"
                                        >
                                            View Bidding
                                        </button>
                                        <button
                                            onClick={() => handleEndAuction(auction.productId)}
                                            className="bg-green-500 text-white py-1 px-4 rounded"
                                            disabled={new Date(auction.endTimeDate) > currentTime}
                                        >
                                            Approve Winner
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <button
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

            <UserDetailsModal
                user={selectedUser}
                isOpen={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
            />

            <BiddingModal
                productId={selectedProduct}
                bids={bids}
                isOpen={biddingModalOpen}
                onClose={() => setBiddingModalOpen(false)}
            />
        </>
    );
};

export default AdminDashboard;
