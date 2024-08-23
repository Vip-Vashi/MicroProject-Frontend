import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from '../Components/AdminNav';

const AdminWinnings = () => {
    const [winnings, setWinnings] = useState([]);

    useEffect(() => {
        const fetchWinnings = async () => {
            try {
                const response = await axios.get('http://localhost:8000/winners/all');
                setWinnings(response.data);
            } catch (error) {
                console.error('Error fetching winnings:', error);
            }
        };

        fetchWinnings();
    }, []);

    return (
       <>
       <AdminNav/>
        <div className="container mx-auto p-4">
            
            <h2 className="text-2xl font-bold mb-4">Auction Winners</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Winner ID</th>
                            <th className="py-2 px-4 border-b">Auction ID</th>
                            <th className="py-2 px-4 border-b">Product Name</th>
                            <th className="py-2 px-4 border-b">Winning Bid Amount</th>
                            <th className="py-2 px-4 border-b">Winner</th>
                            <th className="py-2 px-4 border-b">Product Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {winnings.length > 0 ? (
                            winnings.map((win) => (
                                <tr key={win.id}>
                                    <td className="py-2 px-4 border-b">{win.id}</td>
                                    <td className="py-2 px-4 border-b">{win.product.productId}</td>
                                    <td className="py-2 px-4 border-b">{win.product.name}</td>
                                    <td className="py-2 px-4 border-b">RS :{win.product.currentBiddingPrice}</td>
                                    <td className="py-2 px-4 border-b">{win.product.user.username}</td>
                                    <td className="py-2 px-4 border-b">
                                        <img
                                            src={`data:image/jpeg;base64,${win.product.imageBlob}`}
                                            alt={win.product.name}
                                            className="w-16 h-16 object-cover"
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-2 px-4 border-b text-center">
                                    No winnings found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};

export default AdminWinnings;
