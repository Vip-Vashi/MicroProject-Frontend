import React, { useEffect, useState } from 'react';
import axios from 'axios';
const BidHistory = () => {
    const [bids, setBids] = useState([]);
    const [userId, setUserId] = useState('');
const [biddings,setBiddings]=useState([]);
    useEffect(() => {
     
        const storedUserId = sessionStorage.getItem('userid');
        setUserId(storedUserId);
        axios.get('http://localhost:8000/biddings/all')
        .then(response => {
          const userBiddings = response.data.filter(bid => bid.bidder == storedUserId);
          // const updatedWinnings = userWinnings.map(winning => ({
          //   ...winning,
          //   paid: JSON.parse(sessionStorage.getItem(`paymentStatus_${winning.product.productId}`)) || winning.paid || false
          // }));
          setBiddings(userBiddings);
        })
        .catch(error => console.error('Error fetching Biddings:', error));
  
        
        const storedBids = JSON.parse(sessionStorage.getItem('bids')) || [];
       
        const userBids = storedBids.filter(bid => bid.userId === storedUserId);
        setBids(userBids);
        console.log("*******************")
        console.log(bids)
        console.log(biddings)
    }, []);
    
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Your Bid History</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600">Product ID</th>
                            <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600">Product Name</th>
                            <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600">Bid Price</th>
                            <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600">Status</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {bids.length > 0 ? (
                            bids.map(bid => (
                                <tr key={bid.productId}>
                                    <td className="py-2 px-4 border-b text-gray-700">{bid.productId}</td>
                                    <td className="py-2 px-4 border-b text-gray-700">{bid.name}</td>
                                    <td className="py-2 px-4 border-b text-gray-700">${bid.currentBiddingPrice}</td>
                                    <td className="py-2 px-4 border-b text-gray-700">{bid.productstatus}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-2 px-4 text-center text-gray-500">No bids placed yet</td>
                            </tr>
                        )}
                    </tbody> */}
                    <tbody>
                        {biddings.length > 0 ? (
                            biddings.map(bid => (
                                <tr key={bid.bidId}>
                                    <td className="py-2 px-4 border-b text-gray-700">{bid.product.productId}</td>
                                    <td className="py-2 px-4 border-b text-gray-700">{bid.product.name}</td>
                                    <td className="py-2 px-4 border-b text-gray-700">${bid.biddingprice}</td>
                                    <td className="py-2 px-4 border-b text-gray-700">{bid.product.productstatus}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-2 px-4 text-center text-gray-500">No bids placed yet</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BidHistory;
