

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast , ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Header from '../Components/Appbar';
// import { FaWallet, FaUserCircle } from 'react-icons/fa';



// const ProductAuction = () => {
//     const [products, setProducts] = useState([]);
//     const [userprofile,setuserprofile]=useState([]);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [highbid,sethighbid]=useState();
//     const [auctionDetails, setAuctionDetails] = useState({
//         productId: '',
//         user: '',
//         currentBiddingPrice: '',
//     });
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [sortOption, setSortOption] = useState('none');
//     useEffect(() => {
//         // Fetch products
//         axios.get('http://localhost:8000/products/all')
//             .then(response => {
//                 setProducts(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching products:', error);
//             });
          
//           sethighbid(products.currentBiddingPrice);
//           console.log(highbid);
//         // Get user ID from session storage
//         const userId = sessionStorage.getItem('userid');
//         setAuctionDetails(prevDetails => ({ ...prevDetails, user: userId }));
//     }, []);

//     const auctionStartTime = new Date(  products.auctionStartTimeDate);
//     const auctionEndTime = new Date(products.endTimeDate);
//     const currentTime = new Date();
//     console.log(auctionStartTime);
//     console.log(auctionEndTime);
//     console.log(currentTime);
  

//     // const isAuctionActive = currentTime >= auctionStartTime && currentTime <= auctionEndTime;
//     useEffect(() => {
//         // Filter and sort products
//         let updatedProducts = products.filter(product =>
//             product.name.toLowerCase().includes(searchTerm.toLowerCase())
//         );

//         if (sortOption === 'startingPriceLow') {
//             updatedProducts.sort((a, b) => a.startingPrice - b.startingPrice);
//         } else if (sortOption === 'startingPriceHigh') {
//             updatedProducts.sort((a, b) => b.startingPrice - a.startingPrice);
//         } else if (sortOption === 'statusAvailable') {
//             updatedProducts = updatedProducts.filter(product => product.productstatus === 'Available');
//         } else if (sortOption === 'statusOnAuction') {
//             updatedProducts = updatedProducts.filter(product => product.productstatus === 'On Auction');
//         }

//         setFilteredProducts(updatedProducts);
//     }, [searchTerm, sortOption, products]);

//     const handleBidAction = (product) => {
//         console.log(product)
//         setAuctionDetails(prevDetails => ({
//             ...prevDetails,
//             productId: product.productId,
//             currentBiddingPrice: product.startingPrice // Set initial bid amount
//         }));
//         setSelectedProduct(product);
//     };



//     const handleStartBid = () => {
      
//         const { startingPrice, currentBiddingPrice } = selectedProduct;

//         if (parseFloat(auctionDetails.currentBiddingPrice) <= Math.max(parseFloat(startingPrice), parseFloat(currentBiddingPrice))) {
//             toast.error('Your bid must be higher than both the starting price and the current bid price!', {
//                 position: toast.POSITION.TOP_CENTER,
//                 autoClose: 5000,
//                 style: { backgroundColor: '#f44336', color: '#fff' },
//                 className: 'toast-error'
//             });
//             return;
//         }

//         const formData = new FormData();
//         formData.append("productId", auctionDetails.productId);
//         formData.append("currentBiddingPrice", auctionDetails.currentBiddingPrice);
//         formData.append("userId", auctionDetails.user);

//         axios.put('http://localhost:8000/products/bid', formData)
//             .then(() => {
//                 // toast.success('Bid placed successfully!', {
//                 //     position: toast.POSITION.TOP_CENTER,
//                 //     autoClose: 5000,
//                 //     style: { backgroundColor: '#4caf50', color: '#fff' },
//                 //     className: 'toast-success'
//                 // });
//                 alert('Bid placed successfully');
//                 window.location.reload();
//                 setSelectedProduct(null); // Close the modal after success
//             })
//             .catch(error => {
//                 console.error('Error placing bid:', error);
//             });

      
        
//     };

//     return (
      
//         <div>
//               <Header/>
//             {/* Product Cards */}
//             <h2 className="text-2xl font-bold mb-4">Explore Products</h2>
//             {/* <button  className="text-2xl">
//                     <FaWallet />
//                 </button> */}
//             <div className="p-4 flex items-center justify-between">  
          
//             <input
//                     type="text"
//                     placeholder="Search products"
//                     className="p-2 border rounded"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <select
//                     className="p-2 border rounded"
//                     value={sortOption}
//                     onChange={(e) => setSortOption(e.target.value)}
//                 >
//                     <option value="none">Sort By</option>
//                     <option value="startingPriceLow">Starting Price: Low to High</option>
//                     <option value="startingPriceHigh">Starting Price: High to Low</option>
//                     <option value="statusAvailable">Status: Available</option>
//                     <option value="statusOnAuction">Status: On Auction</option>
//                 </select>
//               </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
//                 {filteredProducts.map(product => (
//                     <div key={product.productId} className="bg-white border rounded-lg shadow-md overflow-hidden">
//                         <img
//                             src={`data:image/jpeg;base64,${product.imageBlob}`}
//                             alt={product.name}
//                             className="w-full h-48 object-cover"
//                         />
//                         <div className="p-4">
//                             <h3 className="text-xl font-bold">{product.name}</h3>
//                             <p>{product.description}</p>
//                             <p className="text-green-500">RS {product.startingPrice}</p>
//                             <p className="text-gray-500">Status: {product.productstatus}</p>
//                             <p className="text-gray-500">Auction Start Time: {product.auctionStartTimeDate}</p>
//                             <p className="text-gray-500">Auction End Time: {product.endTimeDate}</p>
//                             <p className="text-gray-900">Current Bid Price: {product.currentBiddingPrice}</p>

//                             <button
//                                // disabled={!isAuctionActive}
//                                className={`mt-2 py-1 px-2 rounded ${product.productstatus === 'Sold' ? 'bg-red-500 text-white cursor-not-allowed' : 'bg-blue-500 text-white'}`}
//                                 onClick={() => handleBidAction(product)}
//                                 disabled={product.productstatus === 'Sold'}
//                             >
//                                 {selectedProduct && selectedProduct.productId === product.productId ? 'Edit Bid' : 'Place Bid'}
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Start Bid Modal */}
//             {selectedProduct && (
//                 <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-white p-6 rounded-lg shadow-lg relative">
//                         <h2 className="text-xl font-bold mb-4">Place Bid for {selectedProduct.name}</h2>
                        
                        
                        
//                         <input
//                             type="number"
//                             placeholder="Initial Bid Amount"
//                             className="w-full p-2 border mb-4"
//                             value={auctionDetails.currentBiddingPrice}
//                             onChange={(e) => setAuctionDetails({ ...auctionDetails, currentBiddingPrice: e.target.value })}
//                         />
//                         <div className="flex justify-end space-x-2">
//                             <button
//                                 className="bg-gray-500 text-white py-1 px-2 rounded"
//                                 onClick={() => setSelectedProduct(null)}
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 className={`bg-blue-500 text-white py-1 px-2 rounded ${parseFloat(auctionDetails.currentBiddingPrice) <= Math.max(parseFloat(selectedProduct.startingPrice), parseFloat(selectedProduct.currentBiddingPrice)) ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                 onClick={handleStartBid}
//                                 disabled={parseFloat(auctionDetails.currentBiddingPrice) <= Math.max(parseFloat(selectedProduct.startingPrice), parseFloat(selectedProduct.currentBiddingPrice))}
//                             >
//                                 Confirm Bid
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}<ToastContainer />
//               <footer className="bg-gray-600 text-white p-4 mt-4">
//                 <div className="container mx-auto text-center">
//                     <p>&copy; 2024 Online Bidding System. All rights reserved.</p>
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default ProductAuction;



//******************* */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Components/Appbar';
import { FaWallet, FaUserCircle } from 'react-icons/fa';
import Banners from '../Components/Productcorosel';

const ProductAuction = () => {
    const [products, setProducts] = useState([]);
    const [userprofile, setuserprofile] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [highbid, sethighbid] = useState();
    const [auctionDetails, setAuctionDetails] = useState({
        productId: '',
        user: '',
        currentBiddingPrice: '',
    });
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('none');

    useEffect(() => {
        // Fetch products
        axios.get('http://localhost:8000/products/all')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });

        // Get user ID from session storage
        const userId = sessionStorage.getItem('userid');
        setAuctionDetails(prevDetails => ({ ...prevDetails, user: userId }));


    }, []);

    useEffect(() => {
        
        let updatedProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortOption === 'startingPriceLow') {
            updatedProducts.sort((a, b) => a.startingPrice - b.startingPrice);
        } else if (sortOption === 'startingPriceHigh') {
            updatedProducts.sort((a, b) => b.startingPrice - a.startingPrice);
        } else if (sortOption === 'statusAvailable') {
            updatedProducts = updatedProducts.filter(product => product.productstatus === 'Available');
        } else if (sortOption === 'statusOnAuction') {
            updatedProducts = updatedProducts.filter(product => product.productstatus === 'On Auction');
        }

        setFilteredProducts(updatedProducts);
    }, [searchTerm, sortOption, products]);

    const handleBidAction = (product) => {
        setAuctionDetails(prevDetails => ({
            ...prevDetails,
            productId: product.productId,
            currentBiddingPrice: product.startingPrice 
        }));
        setSelectedProduct(product);
    };

    const handleStartBid = () => {
        const { startingPrice, currentBiddingPrice } = selectedProduct;

        if (parseFloat(auctionDetails.currentBiddingPrice) <= Math.max(parseFloat(startingPrice), parseFloat(currentBiddingPrice))) {
            alert('Your bid must be higher than both the starting price and the current bid price!') ;
            
        }

        const formData = new FormData();
        formData.append("productId", auctionDetails.productId);
        formData.append("currentBiddingPrice", auctionDetails.currentBiddingPrice);
        formData.append("userId", auctionDetails.user);

        axios.put('http://localhost:8000/products/bid', formData)
            .then(() => {
                let storedBids = JSON.parse(sessionStorage.getItem('bids')) || [];
                const newBid = {
                    productId: auctionDetails.productId,
                    name: selectedProduct.name,
                    currentBiddingPrice: auctionDetails.currentBiddingPrice,
                    productstatus: selectedProduct.productstatus,
                    userId: sessionStorage.getItem('userid')
                };
                storedBids.push(newBid);
                sessionStorage.setItem('bids', JSON.stringify(storedBids));
                alert('Bid placed successfully');
                window.location.reload();
                setSelectedProduct(null); // Close the modal after success
            })
            .catch(error => {
                console.error('Error placing bid:', error);
                alert("Bid Failed")
            });
    };

    const getButtonStyles = (product) => {
        const currentTime = new Date();
        const auctionStartTime = new Date(product.auctionStartTimeDate);
        const auctionEndTime = new Date(product.endTimeDate);

        if (currentTime < auctionStartTime) {
            return 'bg-gray-500 text-white cursor-not-allowed'; // Upcoming auction
        } else if (currentTime > auctionEndTime) {
            return 'bg-red-500 text-white cursor-not-allowed'; // Auction ended
        } else {
            return 'bg-blue-500 text-white'; // Auction active
        }
    };

    return (
        <div>
            <Header />
            <Banners/>
            {/* Product Cards */}
            {/* <h2 className="text-2xl font-bold mb-4" role='heading'>Explore Products</h2> */}
            <div className="p-4 flex items-center justify-between">
                <input
                    type="text"
                    placeholder="Search products"
                    className="p-2 border rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="p-2 border rounded"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    role='combobox'
                >
                    <option value="none" >Sort By</option>
                    <option value="startingPriceLow">Starting Price: Low to High</option>
                    <option value="startingPriceHigh">Starting Price: High to Low</option>
                    <option value="statusAvailable">Status: Available</option>
                    <option value="statusOnAuction">Status: On Auction</option>
                </select>
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                    <div key={product.productId} className="bg-white border rounded-lg shadow-md overflow-hidden">
                        <img
                            src={`data:image/jpeg;base64,${product.imageBlob}`}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-bold">{product.name}</h3>
                            <p>{product.description}</p>
                            <p className="text-green-500">RS {product.startingPrice}</p>
                            <p className="text-gray-500">Status: {product.productstatus}</p>
                            <p className="text-gray-500">Auction Start Time: {product.auctionStartTimeDate}</p>
                            <p className="text-gray-500">Auction End Time: {product.endTimeDate}</p>
                            <p className="text-gray-900">Current Bid Price: {product.currentBiddingPrice}</p>

                            <button
                               
                                className={`mt-2 py-1 px-2 rounded ${getButtonStyles(product)}`}
                                onClick={() => handleBidAction(product)}
                                disabled={getButtonStyles(product) === 'bg-gray-500 text-white cursor-not-allowed' || getButtonStyles(product) === 'bg-red-500 text-white cursor-not-allowed'}
                            >
                                {selectedProduct && selectedProduct.productId === product.productId ? 'Edit Bid' : 'Place Bid'}
                            </button>
                        </div>
                    </div>
                ))}
            </div> */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    {filteredProducts.map(product => (
        <div key={product.productId} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
            <img
                src={`data:image/jpeg;base64,${product.imageBlob}`}
                alt={product.name}
                className="w-full h-48 object-cover bg-gray-100"
            />
            <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-green-600 text-lg font-bold mb-2">RS {product.startingPrice}</p>
                <p className="text-gray-500 mb-2">Status: {product.productstatus}</p>
                <p className="text-gray-500 mb-2">Auction Start Time: {product.auctionStartTimeDate}</p>
                <p className="text-gray-500 mb-4">Auction End Time: {product.endTimeDate}</p>
                <p className="text-gray-800 text-lg font-semibold mb-4">Current Bid Price: {product.currentBiddingPrice}</p>

                <button
                    className={`w-full py-2 px-4 rounded focus:outline-none ${getButtonStyles(product)} transition-colors duration-300`}
                    onClick={() => handleBidAction(product)}
                    disabled={getButtonStyles(product) === 'bg-gray-500 text-white cursor-not-allowed' || getButtonStyles(product) === 'bg-red-500 text-white cursor-not-allowed'}
                >
                    {selectedProduct && selectedProduct.productId === product.productId ? 'Edit Bid' : 'Place Bid'}
                </button>
            </div>
        </div>
    ))}
</div>



            {/* Start Bid Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg relative">
                        <h2 className="text-xl font-bold mb-4" role='bidmodal'>Place Bid for {selectedProduct.name}</h2>
                        <input
                            type="number"
                            placeholder="Initial Bid Amount"
                            className="w-full p-2 border mb-4"
                            value={auctionDetails.currentBiddingPrice}
                            onChange={(e) => setAuctionDetails({ ...auctionDetails, currentBiddingPrice: e.target.value })}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-gray-500 text-white py-1 px-2 rounded"
                                onClick={() => setSelectedProduct(null)}
                            >
                                Cancel
                            </button>
                            <button
                               role='bid'
                                className={`bg-blue-500 text-white py-1 px-2 rounded ${parseFloat(auctionDetails.currentBiddingPrice) <= Math.max(parseFloat(selectedProduct.startingPrice), parseFloat(selectedProduct.currentBiddingPrice)) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handleStartBid}
                                disabled={parseFloat(auctionDetails.currentBiddingPrice) <= Math.max(parseFloat(selectedProduct.startingPrice), parseFloat(selectedProduct.currentBiddingPrice))}
                            >
                                Confirm Bid
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
            <footer className="bg-gray-600 text-white p-4 mt-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 Online Bidding System. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default ProductAuction;
