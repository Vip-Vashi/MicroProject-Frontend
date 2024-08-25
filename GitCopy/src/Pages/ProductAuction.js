

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

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Header from '../Components/Appbar';
// import { FaWallet, FaUserCircle, FaRupeeSign } from 'react-icons/fa';
// import Banners from '../Components/Productcorosel';

// const ProductAuction = () => {
//     const [products, setProducts] = useState([]);
//     const [userprofile, setuserprofile] = useState([]);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [highbid, sethighbid] = useState();
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

//         // Get user ID from session storage
//         const userId = sessionStorage.getItem('userid');
//         setAuctionDetails(prevDetails => ({ ...prevDetails, user: userId }));


//     }, []);

//     useEffect(() => {
        
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
//         setAuctionDetails(prevDetails => ({
//             ...prevDetails,
//             productId: product.productId,
//             currentBiddingPrice: product.startingPrice 
//         }));
//         setSelectedProduct(product);
//     };

//     const handleStartBid = () => {
//         const { startingPrice, currentBiddingPrice } = selectedProduct;

//         if (parseFloat(auctionDetails.currentBiddingPrice) <= Math.max(parseFloat(startingPrice), parseFloat(currentBiddingPrice))) {
//             alert('Your bid must be higher than both the starting price and the current bid price!') ;
            
//         }

//         const formData = new FormData();
//         formData.append("productId", auctionDetails.productId);
//         formData.append("currentBiddingPrice", auctionDetails.currentBiddingPrice);
//         formData.append("userId", auctionDetails.user);

//         axios.put('http://localhost:8000/products/bid', formData)
//             .then(() => {
//                 let storedBids = JSON.parse(sessionStorage.getItem('bids')) || [];
//                 const newBid = {
//                     productId: auctionDetails.productId,
//                     name: selectedProduct.name,
//                     currentBiddingPrice: auctionDetails.currentBiddingPrice,
//                     productstatus: selectedProduct.productstatus,
//                     userId: sessionStorage.getItem('userid')
//                 };
//                 storedBids.push(newBid);
//                 sessionStorage.setItem('bids', JSON.stringify(storedBids));
//                 alert('Bid placed successfully');
//                 window.location.reload();
//                 setSelectedProduct(null); // Close the modal after success
//             })
//             .catch(error => {
//                 console.error('Error placing bid:', error);
//                 alert("Bid Failed")
//             });
//     };

//     const getButtonStyles = (product) => {
//         const currentTime = new Date();
//         const auctionStartTime = new Date(product.auctionStartTimeDate);
//         const auctionEndTime = new Date(product.endTimeDate);

//         if (currentTime < auctionStartTime) {
//             return 'bg-gray-500 text-white cursor-not-allowed'; // Upcoming auction
//         } else if (currentTime > auctionEndTime) {
//             return 'bg-red-500 text-white cursor-not-allowed'; // Auction ended
//         } else {
//             return 'bg-blue-500 text-white'; // Auction active
//         }
//     };

//     return (
//         <div>
//             <Header />
//             <Banners/>
//             {/* Product Cards */}
//             {/* <h2 className="text-2xl font-bold mb-4" role='heading'>Explore Products</h2> */}
//             <div className="p-4 flex items-center justify-between">
//                 <input
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
//                     role='combobox'
//                 >
//                     <option value="none" >Sort By</option>
//                     <option value="startingPriceLow">Starting Price: Low to High</option>
//                     <option value="startingPriceHigh">Starting Price: High to Low</option>
//                     <option value="statusAvailable">Status: Available</option>
//                     <option value="statusOnAuction">Status: On Auction</option>
//                 </select>
//             </div>
//             {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                               
//                                 className={`mt-2 py-1 px-2 rounded ${getButtonStyles(product)}`}
//                                 onClick={() => handleBidAction(product)}
//                                 disabled={getButtonStyles(product) === 'bg-gray-500 text-white cursor-not-allowed' || getButtonStyles(product) === 'bg-red-500 text-white cursor-not-allowed'}
//                             >
//                                 {selectedProduct && selectedProduct.productId === product.productId ? 'Edit Bid' : 'Place Bid'}
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div> */}

// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-12">
//     {filteredProducts.map(product => (
//         <div key={product.productId} className="bg-white border border-gray-200 rounded-lg p-2 rounded-2xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
//             <img
//                 src={`data:image/jpeg;base64,${product.imageBlob}`}
//                 alt={product.name}
//                 className="w-full h-48 object-cover bg-gray-100"
//             />
//             <div className="p-6">
//                 <h3 className="text-2xl font-semibold mb-2 text-gray-800">{product.name}</h3>
//                 <p className="text-gray-600 mb-4">{product.description}</p>
//                 <p className="text-green-600 text-xl font-bold mb-2 flex items-center">
//         Starting Price
//         <span className="flex items-center ml-2">
//           <FaRupeeSign className="text-xl" />
//           <span className="ml-1">{product.startingPrice}</span>
//         </span>
//       </p>
//                 <p className="text-gray-500 mb-2">Status: {product.productstatus}</p>
//                 <p className="text-gray-500 mb-2">Auction Start Time: {product.auctionStartTimeDate}</p>
//                 <p className="text-gray-500 mb-4">Auction End Time: {product.endTimeDate}</p>
//                 <p className="text-gray-800 text-xl font-semibold mb-4 animate-blink text-red-500">Current Bid Price: {product.currentBiddingPrice}</p>

//                 <button
//                     className={`w-full py-2 px-4 rounded focus:outline-none ${getButtonStyles(product)} transition-colors duration-300`}
//                     onClick={() => handleBidAction(product)}
//                     disabled={getButtonStyles(product) === 'bg-gray-500 text-white cursor-not-allowed' || getButtonStyles(product) === 'bg-red-500 text-white cursor-not-allowed'}
//                 >
//                     {selectedProduct && selectedProduct.productId === product.productId ? 'Edit Bid' : 'Place Bid'}
//                 </button>
//             </div>
//         </div>
//     ))}
// </div>



//             {/* Start Bid Modal */}
//             {selectedProduct && (
//                 <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-white p-6 rounded-lg shadow-lg relative">
//                         <h2 className="text-xl font-bold mb-4" role='bidmodal'>Place Bid for {selectedProduct.name}</h2>
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
//                                role='bid'
//                                 className={`bg-blue-500 text-white py-1 px-2 rounded ${parseFloat(auctionDetails.currentBiddingPrice) <= Math.max(parseFloat(selectedProduct.startingPrice), parseFloat(selectedProduct.currentBiddingPrice)) ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                 onClick={handleStartBid}
//                                 disabled={parseFloat(auctionDetails.currentBiddingPrice) <= Math.max(parseFloat(selectedProduct.startingPrice), parseFloat(selectedProduct.currentBiddingPrice))}
//                             >
//                                 Confirm Bid
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             <ToastContainer />
//             <footer className="bg-gray-600 text-white p-4 mt-4">
//                 <div className="container mx-auto text-center">
//                     <p>&copy; 2024 Online Bidding System. All rights reserved.</p>
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default ProductAuction;
//FInal Version 





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Modal, Button } from 'react-bootstrap'; 
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Header from '../Components/Appbar';
// import { FaRupeeSign } from 'react-icons/fa';
// import Banners from '../Components/Productcorosel';

// const ProductAuction = () => {
//     const [products, setProducts] = useState([]);
//     const [userprofile, setuserprofile] = useState([]);
//     const [selectedProduct, setSelectedProduct] = useState(null);
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

//         // Get user ID from session storage
//         const userId = sessionStorage.getItem('userid');
//         setAuctionDetails(prevDetails => ({ ...prevDetails, user: userId }));
//     }, []);

//     useEffect(() => {
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
//         setAuctionDetails(prevDetails => ({
//             ...prevDetails,
//             productId: product.productId,
//             currentBiddingPrice: product.startingPrice 
//         }));
//         setSelectedProduct(product);
//     };

//     const handleStartBid = () => {
//         const { startingPrice, currentBiddingPrice } = selectedProduct;

//         if (parseFloat(auctionDetails.currentBiddingPrice) <= Math.max(parseFloat(startingPrice), parseFloat(currentBiddingPrice))) {
//             alert('Your bid must be higher than both the starting price and the current bid price!');
//             return;
//         }

//         const formData = new FormData();
//         formData.append("productId", auctionDetails.productId);
//         formData.append("currentBiddingPrice", auctionDetails.currentBiddingPrice);
//         formData.append("userId", auctionDetails.user);

//         axios.put('http://localhost:8000/products/bid', formData)
//             .then(() => {
//                 let storedBids = JSON.parse(sessionStorage.getItem('bids')) || [];
//                 const newBid = {
//                     productId: auctionDetails.productId,
//                     name: selectedProduct.name,
//                     currentBiddingPrice: auctionDetails.currentBiddingPrice,
//                     productstatus: selectedProduct.productstatus,
//                     userId: sessionStorage.getItem('userid')
//                 };
//                 storedBids.push(newBid);
//                 sessionStorage.setItem('bids', JSON.stringify(storedBids));
//                 alert('Bid placed successfully');
//                 window.location.reload();
//                 setSelectedProduct(null); // Close the modal after success
//             })
//             .catch(error => {
//                 console.error('Error placing bid:', error);
//                 alert("Bid Failed");
//             });
//     };

//     const getButtonStyles = (product) => {
//         const currentTime = new Date();
//         const auctionStartTime = new Date(product.auctionStartTimeDate);
//         const auctionEndTime = new Date(product.endTimeDate);

//         if (currentTime < auctionStartTime) {
//             return 'bg-gray-500 text-white cursor-not-allowed'; // Upcoming auction
//         } else if (currentTime > auctionEndTime && product.productstatus === 'Sold') {
//             return 'bg-gray-500 text-white cursor-not-allowed'; // Product Sold
//         } else if (currentTime > auctionEndTime) {
//             return 'bg-red-500 text-white cursor-not-allowed'; // Auction ended
//         } else {
//             return 'bg-blue-500 text-white'; // Auction active
//         }
//     };

//     return (
//         <div>
//             <Header />
//             <Banners/>
//             {/* Product Cards */}
//             <div className="p-4 flex items-center justify-between">
//                 <input
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
//                     role='combobox'
//                 >
//                     <option value="none">Sort By</option>
//                     <option value="startingPriceLow">Starting Price: Low to High</option>
//                     <option value="startingPriceHigh">Starting Price: High to Low</option>
//                     <option value="statusAvailable">Status: Available</option>
//                     <option value="statusOnAuction">Status: On Auction</option>
//                 </select>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-12">
//                 {filteredProducts.map(product => (
//                     <div key={product.productId} className="bg-white border border-gray-200 rounded-lg p-2 rounded-2xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
//                         <img
//                             src={`data:image/jpeg;base64,${product.imageBlob}`}
//                             alt={product.name}
//                             className="w-full h-48 object-cover bg-gray-100"
//                         />
//                         <div className="p-6">
//                             <h3 className="text-2xl font-semibold mb-2 text-gray-800">{product.name}</h3>
//                             <p className="text-gray-600 mb-4">{product.description}</p>
//                             <p className="text-green-600 text-xl font-bold mb-2 flex items-center">
//                                 Starting Price
//                                 <span className="flex items-center ml-2">
//                                     <FaRupeeSign className="text-xl" />
//                                     <span className="ml-1">{product.startingPrice}</span>
//                                 </span>
//                             </p>
//                             <p className="text-gray-500 mb-2">Status: {product.productstatus}</p>
//                             <p className="text-gray-500 mb-2">Auction Start Time: {product.auctionStartTimeDate}</p>
//                             <p className="text-gray-500 mb-4">Auction End Time: {product.endTimeDate}</p>
//                             <p className={`text-gray-800 text-xl font-semibold mb-4 ${product.productstatus === 'Sold' ? '' : 'animate-blink'} ${product.productstatus === 'Sold' ? 'text-green-600' : 'text-red-500'}`}>
//                                 {product.productstatus === 'Sold' 
//                                     ? `Sold for Price: ${product.currentBiddingPrice}`
//                                     : `Current Bid Price: ${product.currentBiddingPrice}`}
//                             </p>

//                             <button
//                                 className={`w-full py-2 px-4 rounded focus:outline-none ${getButtonStyles(product)} transition-colors duration-300`}
//                                 onClick={() => handleBidAction(product)}
//                                 disabled={getButtonStyles(product) === 'bg-gray-500 text-white cursor-not-allowed' || getButtonStyles(product) === 'bg-red-500 text-white cursor-not-allowed'}
//                             >
//                                 {product.productstatus === 'Sold' ? 'Product Sold' : (selectedProduct && selectedProduct.productId === product.productId ? 'Edit Bid' : 'Place Bid')}
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Start Bid Modal */}
//             {selectedProduct && (
//                 <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-white p-6 rounded-lg shadow-lg relative">
//                         <h2 className="text-xl font-bold mb-4" role='bidmodal'>Place Bid for {selectedProduct.name}</h2>
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
//                                 role='bid'
//                                 className={`bg-blue-500 text-white py-1 px-2 rounded ${parseFloat(auctionDetails.currentBiddingPrice) <= Math.max(parseFloat(selectedProduct.startingPrice), parseFloat(selectedProduct.currentBiddingPrice)) ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                 onClick={handleStartBid}
//                                 disabled={parseFloat(auctionDetails.currentBiddingPrice) <= Math.max(parseFloat(selectedProduct.startingPrice), parseFloat(selectedProduct.currentBiddingPrice))}
//                             >
//                                 Confirm Bid
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             <ToastContainer />
//             <footer className="bg-gray-600 text-white p-4 mt-4">
//                 <div className="container mx-auto text-center">
//                     <p>&copy; 2024 Online Bidding System. All rights reserved.</p>
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default ProductAuction;
/////***************************FINAL VERSION**********************************////

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import Header from '../Components/Appbar';
import Banners from '../Components/Productcorosel';
import { FaRupeeSign } from 'react-icons/fa';
import Swal from 'sweetalert2';
const ProductAuction = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [auctionDetails, setAuctionDetails] = useState({
        productId: '',
        user: '',
        currentBiddingPrice: '',
    });
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('none');

    const [showAddModal, setShowAddModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        imageBlob: null,
        imageUrl: '',
        description: '',
        startingPrice: '',
        auctionStartTimeDate: '',
        endTimeDate: '',
        productstatus: 'Available',
        user: {
            uid: 0
        }
    });

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
            // alert('Your bid must be higher than both the starting price and the current bid price!');
            Swal.fire({
                title: 'Warning!!',
                text: 'Your bid must be higher than both the starting price and the current bid price',
                icon: 'error',
                position: 'top-end',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6', 
                // timer: 25000,  
              });
            return;
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
                // alert('Bid placed successfully');
                Swal.fire({
                    title: 'Success',
                    text: 'Bid placed successfully !!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                    // timer:25000
                  });

                window.location.reload();
                setSelectedProduct(null); // Close the modal after success
            })
            .catch(error => {
                console.error('Error placing bid:', error);
                // alert("Bid Failed");
                Swal.fire({
                    title: 'Error placing bid ',
                    text: 'Bid Failed  ',
                    icon: 'error',
                    position: 'top-end',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#3085d6', 
                    timer: 5000, 
                  });
            });
    };

    const validateProductData = () => {
        const now = new Date().toISOString();
        const { auctionStartTimeDate, endTimeDate } = newProduct;
        
        if (new Date(auctionStartTimeDate) < new Date(now)) {
            // alert('Auction start date cannot be in the past.');
            Swal.fire({
                title: 'Warning',
                text: 'Auction start date cannot be in the past. ',
                icon: 'error',
                position: 'top-end',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6', 
                timer: 5000, 
              });
            return false;
        }

        if (new Date(endTimeDate) < new Date(now)) {
            // alert('End date cannot be in the past.');
            Swal.fire({
                title: 'Warning',
                text: 'End date cannot be in the past. ',
                icon: 'error',
                position: 'top-end', 
                showConfirmButton: true,
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6',
                timer: 5000, 
              });
            return false;
        }

        if (new Date(endTimeDate) <= new Date(auctionStartTimeDate)) {
            // alert('End date should be after the auction start date.');
            Swal.fire({
                title: 'Warning',
                text: 'End date should be after the auction start date. ',
                icon: 'error',
               
                position: 'top-end',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6', 
                timer: 5000, 
              });
            return false;
        }

        return true;
    };

    const handleAddProduct = async () => {
        if (!validateProductData()) return;
        try {
            const data = new FormData();
            data.append('name', newProduct.name);
            data.append('description', newProduct.description);
            data.append('startingPrice', newProduct.startingPrice);
            data.append('productstatus', newProduct.productstatus);
            data.append('auctionStartTimeDate', newProduct.auctionStartTimeDate);
            data.append('endTimeDate', newProduct.endTimeDate);
            data.append('imageUrl', newProduct.imageUrl);
            data.append('user', newProduct.user.uid);
            
            if (newProduct.imageBlob) {
                data.append('imageBlob', newProduct.imageBlob);
            }

            await axios.post('http://localhost:8000/products/create', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setProducts([...products, newProduct]);
            setShowAddModal(false);
            setNewProduct({
                name: '',
                imageBlob: null,
                imageUrl: '',
                description: '',
                startingPrice: '',
                auctionStartTimeDate: '',
                endTimeDate: '',
                productstatus: 'Available',
                user: {
                    uid: 0
                }
            });
        } catch (error) {
            console.error('Error adding product:', error);
            alert("Failed to add product.");
        }
    };

    const getButtonStyles = (product) => {
        const currentTime = new Date();
        const auctionStartTime = new Date(product.auctionStartTimeDate);
        const auctionEndTime = new Date(product.endTimeDate);

        if (currentTime < auctionStartTime) {
            return 'bg-gray-500 text-white cursor-not-allowed'; // Upcoming auction
        } else if (currentTime > auctionEndTime && product.productstatus === 'Sold') {
            return 'bg-gray-500 text-white cursor-not-allowed'; // Product Sold
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
                    <option value="none">Sort By</option>
                    <option value="startingPriceLow">Starting Price: Low to High</option>
                    <option value="startingPriceHigh">Starting Price: High to Low</option>
                    <option value="statusAvailable">Status: Available</option>
                    <option value="statusOnAuction">Status: On Auction</option>
                </select>
                <Button className="bg-blue-500 text-white" onClick={() => setShowAddModal(true)}>
                    Add Product
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-12">
                {filteredProducts.map(product => (
                    <div key={product.productId} className="bg-white border border-gray-200 rounded-lg p-2 rounded-2xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
                        <img
                            src={`data:image/jpeg;base64,${product.imageBlob}`}
                            alt={product.name}
                            className="w-full h-48 object-cover bg-gray-100"
                        />
                        <div className="p-6">
                            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-2">{product.description}</p>
                            <p className="text-green-600  font-bold mb-2 flex items-center">
                                Starting Price
                                 <span className="flex items-center ml-2">
                                     <FaRupeeSign className="text" />
                                     <span className="ml-1">{product.startingPrice}</span>
                                 </span>
                             </p>
                            <p className={`text-xl mb-2 ${product.productstatus === 'On Auction' ? 'text-green-500' : 'text-red-500'}`}>{product.productstatus}</p>
                            <p className="text-gray-500 mb-2">Auction Start Time: {product.auctionStartTimeDate}</p>
                             <p className="text-gray-500 mb-4">Auction End Time: {product.endTimeDate}</p>
                             <p className={`text-gray-800 text-lg font-bold mb-4 flex items-center ${product.productstatus === 'Sold' ? '' : 'animate-blink'} ${product.productstatus === 'Sold' ? 'text-green-600' : 'text-red-500'}`}>
                                {product.productstatus === 'Sold' ? 'Sold for Price:' : 'Current Bid Price:'}
                                <span className="flex items-center ml-2">
                                    <FaRupeeSign className="text-xl" />
                                    <span className="ml-1">
                                        {product.currentBiddingPrice}
                                    </span>
                                </span>
                            </p>

                            <button
                                className={`py-2 px-4 rounded ${getButtonStyles(product)}`}
                                onClick={() => handleBidAction(product)}
                                disabled={new Date() < new Date(product.auctionStartTimeDate) || new Date() > new Date(product.endTimeDate) || product.productstatus === 'Sold'}
                            >
                                {new Date() < new Date(product.auctionStartTimeDate) ? 'Auction Starting Soon' : new Date() > new Date(product.endTimeDate) ? 'Auction Ended' : product.productstatus === 'Sold' ? 'Product Sold' : 'Place Bid'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bid Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white border border-gray-300 rounded-lg p-6 w-1/3">
                        <h2 className="text-xl font-bold mb-4">Place a Bid for {selectedProduct.name}</h2>
                        <p className="mb-4">Current Bid Price: <span className="font-bold">{selectedProduct.currentBiddingPrice || selectedProduct.startingPrice}</span></p>
                        <input
                            type="number"
                            placeholder="Enter your bid"
                            className="w-full p-2 border mb-4"
                            value={auctionDetails.currentBiddingPrice}
                            onChange={e => setAuctionDetails({ ...auctionDetails, currentBiddingPrice: e.target.value })}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-gray-500 text-white py-1 px-2 rounded"
                                onClick={() => setSelectedProduct(null)}
                            >
                                Cancel
                            </button>
                            <button
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

            {/* Add Product Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        placeholder="Product Name"
                        className="w-full p-2 border mb-2"
                        value={newProduct.name}
                        onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        className="w-full p-2 border mb-2"
                        value={newProduct.description}
                        onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Starting Price"
                        className="w-full p-2 border mb-2"
                        value={newProduct.startingPrice}
                        onChange={e => setNewProduct({ ...newProduct, startingPrice: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Status"
                        className="w-full p-2 border mb-2"
                        value={newProduct.productstatus}
                        onChange={e => setNewProduct({ ...newProduct, productstatus: e.target.value })}
                    />
                    <input
                        type="datetime-local"
                        name="auctionStartTimeDate"
                        value={newProduct.auctionStartTimeDate}
                        onChange={e => setNewProduct({ ...newProduct, auctionStartTimeDate: e.target.value })}
                        className="w-full p-2 border mb-2"
                    />
                    <input
                        type="datetime-local"
                        name="endTimeDate"
                        value={newProduct.endTimeDate}
                        onChange={e => setNewProduct({ ...newProduct, endTimeDate: e.target.value })}
                        className="w-full p-2 border mb-2"
                    />
                    <input
                        type="file"
                        className="w-full p-2 border mb-2"
                        onChange={e => setNewProduct({ ...newProduct, imageBlob: e.target.files[0] })}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleAddProduct}>Add Product</Button>
                </Modal.Footer>
            </Modal>

            <footer className="bg-gray-600 text-white p-4 mt-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 Online Bidding System. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default ProductAuction;
