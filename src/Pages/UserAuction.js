import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const UserPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showBidModal, setShowBidModal] = useState(false);
    const [bidAmount, setBidAmount] = useState('');
    const [auctionId, setAuctionId] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/products/all');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleStartBid = async (product) => {
        setSelectedProduct(product);

        try {
            const response = await axios.get(`http://localhost:8000/auction/${product.pid}`);
            if (response.data) {
                // Auction exists for this product
                setAuctionId(response.data.auctionId);
            } else {
                // No auction exists, so start a new auction
                await axios.post('http://localhost:8000/auction/start', { productId: product.pid });
                setAuctionId(response.data.auctionId);
            }
        } catch (error) {
            console.error('Error fetching or starting auction:', error);
        }

        setShowBidModal(true);
    };

    const handlePlaceBid = async () => {
        try {
            await axios.post('http://localhost:8000/bids', null, {
                params: {
                    auctionId: auctionId,
                    bidderId: sessionStorage.getItem(), 
                    biddingPrice: bidAmount
                }
            });
            setShowBidModal(false);
        } catch (error) {
            console.error('Error placing bid:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">User Product Page</h2>

            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <div key={product.pid} className="bg-white border rounded-lg shadow-md overflow-hidden">
                        <img
                            src={`data:image/jpeg;base64,${product.image}`}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-bold">{product.name}</h3>
                            <p>{product.description}</p>
                            <p className="text-green-500">RS :{product.startingPrice}</p>
                            <p>{product.productStatus}</p>
                            <Button
                                className="bg-blue-500 text-white mt-4"
                                onClick={() => handleStartBid(product)}
                            >
                                Start Bid
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bid Modal */}
            <Modal show={showBidModal} onHide={() => setShowBidModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Place Your Bid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="number"
                        placeholder="Enter your bid amount"
                        className="w-full p-2 border mb-2"
                        value={bidAmount}
                        onChange={e => setBidAmount(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowBidModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handlePlaceBid}>
                        Place Bid
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserPage;
