import React from 'react';

const AuctionCard = ({ auction }) => {
    return (
        <div className="border rounded-lg p-4 bg-white shadow-md">
            <img src={`data:image/jpeg;base64,${auction.product.image}`} alt={auction.product.name} className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-lg font-bold mt-2">{auction.product.name}</h3>
            <p>{auction.product.description}</p>
            <p className="text-gray-700 mt-2">Current Highest Bid: ${auction.highestBid}</p>
            <p className="text-gray-700">Ends at: {new Date(auction.endDate).toLocaleString()}</p>
        </div>
    );
};

export default AuctionCard;
