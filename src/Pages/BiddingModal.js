import React from 'react';
import Modal from 'react-bootstrap/Modal';

const BiddingModal = ({ productId, bids, isOpen, onClose }) => {
    // Filter bids for the selected product
    const productBids = bids.filter(bid => bid.product.productId === productId);
    console.log("****************")
console.log(productBids);
    return (
        <Modal show={isOpen} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Bids for Product ID: {productId}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {productBids.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">Bid ID</th>
                                <th className="border border-gray-300 p-2">User ID</th>
                                <th className="border border-gray-300 p-2">Bid Amount</th>
                                {/* <th className="border border-gray-300 p-2">Timestamp</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {productBids.map(bid => (
                                <tr key={bid.bidId}>
                                    <td className="border border-gray-300 p-2">{bid.bidId}</td>
                                    <td className="border border-gray-300 p-2">{bid.bidder}</td>
                                    <td className="border border-gray-300 p-2">{bid.biddingprice}</td>
                                    {/* <td className="border border-gray-300 p-2">{new Date(bid.timestamp).toLocaleString()}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No bids available for this product.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <button onClick={onClose} className="bg-blue-500 text-white py-2 px-4 rounded">
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default BiddingModal;
