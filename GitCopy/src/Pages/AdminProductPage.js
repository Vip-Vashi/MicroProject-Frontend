
//-----------------------version-2---------------------------------
//----------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Modal, Button } from 'react-bootstrap'; // Import modal for adding products
// import 'tailwindcss/tailwind.css';
// import AdminNav from '../Components/AdminNav';

// const AdminProductPage = () => {
//     const [products, setProducts] = useState([]);
//     const [users, setUsers] = useState([]); 
//     const [editProduct, setEditProduct] = useState(null);
//     const [showAddModal, setShowAddModal] = useState(false);
    
//     const [newProduct, setNewProduct] = useState({
//         name: '',
//         imageBlob: null,
//         imageUrl: '',
//         description: '',
//         startingPrice: '',
//         auctionStartTimeDate: '',
//         endTimeDate: '',
//         productstatus: 'Available',
//         user: {
//             uid: 0
//         }
//     });

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/users/all');
//                 setUsers(response.data);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };
//         fetchUsers();
//     }, []);

//     useEffect(() => {
//         axios
//             .get('http://localhost:8000/products/all')
//             .then(response => setProducts(response.data))
//             .catch(err => console.log(err));
//     }, []);

//     const validateProductData = () => {
//         const now = new Date().toISOString();
//         const { auctionStartTimeDate, endTimeDate } = newProduct;
        
//         if (new Date(auctionStartTimeDate) < new Date(now)) {
//             alert('Auction start date cannot be in the past.');
//             return false;
//         }

//         if (new Date(endTimeDate) < new Date(now)) {
//             alert('End date cannot be in the past.');
//             return false;
//         }

//         if (new Date(endTimeDate) <= new Date(auctionStartTimeDate)) {
//             alert('End date should be after the auction start date.');
//             return false;
//         }

//         return true;
//     };


//     const handleAddProduct = async () => {
//         if (!validateProductData()) return;
//         try {
//             const data = new FormData();
//             data.append('name', newProduct.name);
//             data.append('description', newProduct.description);
//             data.append('startingPrice', newProduct.startingPrice);
//             data.append('productstatus', newProduct.productstatus);
//             data.append('auctionStartTimeDate', newProduct.auctionStartTimeDate);
//             data.append('endTimeDate', newProduct.endTimeDate);
//             data.append('imageUrl', newProduct.imageUrl);
//             data.append('user', newProduct.user.uid);
            
//             if (newProduct.imageBlob) {
//                 data.append('imageBlob', newProduct.imageBlob);
//             }

//             await axios.post('http://localhost:8000/products/create', data, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             setProducts([...products, newProduct]);
//             setShowAddModal(false);
//         } catch (error) {
//             console.error('Error adding product:', error);
//             alert("Failed to add product.");
//         }
//     };
    

//     const handleEditProduct = async () => {

//         try {
//             const formData = new FormData();
//             formData.append('name', editProduct.name);
//             formData.append('description', editProduct.description);
//             formData.append('startingPrice', editProduct.startingPrice);
//             formData.append('productstatus', editProduct.productstatus);
//             formData.append('auctionStartTimeDate', editProduct.auctionStartTimeDate);
//             formData.append('endTimeDate', editProduct.endTimeDate);
//             formData.append('imageUrl', editProduct.imageUrl);

//             formData.append('user', editProduct.user.uid);

//             if (editProduct.imageBlob) {
//                 formData.append('imageBlob', editProduct.imageBlob);
//             }

//             await axios.put(`http://localhost:8000/products/update/${editProduct.productId}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             setProducts(products.map(product => 
//                 product.productId === editProduct.productId ? editProduct : product
//             ));
//             setEditProduct(null);
//         } catch (error) {
//             console.error('Error updating product:', error);
//             alert('Failed to update product.');
//         }

      
    
//     };

//     return (
//         <>
//             <AdminNav />
//             <div className="container mx-auto p-4">
//                 <h2 className="text-2xl font-bold mb-4" role='header'>Admin Product Management</h2>

//                 <Button className="mb-4 bg-blue-500 text-white" onClick={() => setShowAddModal(true)}>
//                     Add Product
//                 </Button>

//                 {/* Product Table */}
//                 <table className="min-w-full bg-white border" role='tables'>
//                     <thead>
//                         <tr>
//                             <th className="py-2 px-4 border-b">Product ID</th>
//                             <th className="py-2 px-4 border-b">Name</th>
//                             <th className="py-2 px-4 border-b">Starting Price</th>
//                             <th className="py-2 px-4 border-b">Description</th>
//                             <th className="py-2 px-4 border-b">Status</th>
//                             <th className="py-2 px-4 border-b">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {products.map(product => (
//                             <tr key={product.productId}>
//                                 <td className="py-2 px-4 border-b">{product.productId}</td>
//                                 <td className="py-2 px-4 border-b">{product.name}</td>
//                                 <td className="py-2 px-4 border-b">${product.startingPrice}</td>
//                                 <td className="py-2 px-4 border-b">{product.description}</td>
//                                 <td className="py-2 px-4 border-b">{product.productstatus}</td>
//                                 <td className="py-2 px-4 border-b">
//                                     <Button 
//                                         role='edit'
//                                         className="bg-blue-500 text-white py-1 px-2 rounded"
//                                         onClick={() => setEditProduct(product)}
//                                     >
//                                         Edit
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 {/* Product Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//                     {products.map(product => (
//                         <div key={product.productId} className="bg-white border rounded-lg shadow-md overflow-hidden">
//                             <img
//                                 src={`data:image/jpeg;base64,${product.imageBlob}`}
//                                 alt={product.name}
//                                 className="w-full h-48 object-cover"
//                             />
//                             <div className="p-4">
//                                 <h3 className="text-xl font-bold">{product.name}</h3>
//                                 <p>{product.description}</p>
//                                 <p className="text-green-500">${product.startingPrice}</p>
//                                 <p className="text-gray-500">Status: {product.productstatus}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Add Product Modal */}
//                 <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title  role='title' >Add New Product</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <input
//                             type="text"
//                             placeholder="Product Name"
//                             className="w-full p-2 border mb-2"
//                             value={newProduct.name}
//                             onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
//                         />
//                         <input
//                             type="text"
//                             placeholder="Description"
//                             className="w-full p-2 border mb-2"
//                             value={newProduct.description}
//                             onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
//                         />
//                         <input
//                             type="number"
//                             placeholder="Starting Price"
//                             className="w-full p-2 border mb-2"
//                             value={newProduct.startingPrice}
//                             onChange={e => setNewProduct({ ...newProduct, startingPrice: e.target.value })}
//                         />
//                         <input
//                             type="text"
//                             placeholder="Status"
//                             className="w-full p-2 border mb-2"
//                             value={newProduct.productstatus}
//                             onChange={e => setNewProduct({ ...newProduct, productstatus: e.target.value })}
//                         />
//                         <input
//                             type="datetime-local"
//                             name="auctionStartTimeDate"
//                             value={newProduct.auctionStartTimeDate}
//                             onChange={e => setNewProduct({ ...newProduct, auctionStartTimeDate: e.target.value })}
                            
//                             className="w-full p-2 border mb-2"
//                         />
//                         <input
//                             type="datetime-local"
//                             name="endTimeDate"
//                             value={newProduct.endTimeDate}
//                             onChange={e => setNewProduct({ ...newProduct, endTimeDate: e.target.value })}
//                             className="w-full p-2 border mb-2"
//                         />
//                         <input
//                             type="file"
//                             className="w-full p-2 border mb-2"
//                             onChange={e => setNewProduct({ ...newProduct, imageBlob: e.target.files[0] })}
//                         />
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
//                         <Button variant="primary" onClick={handleAddProduct} role='addprod' >Add Product</Button>
//                     </Modal.Footer>
//                 </Modal>

//                 {/* Edit Product Modal */}
//                 {editProduct && (
//                     <Modal show={true} onHide={() => setEditProduct(null)}>
//                         <Modal.Header closeButton>
//                             <Modal.Title>Edit Product</Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body>
//                             <input
//                                 type="text"
//                                 placeholder="Product Name"
//                                 className="w-full p-2 border mb-2"
//                                 value={editProduct.name}
//                                 onChange={e => setEditProduct({ ...editProduct, name: e.target.value })}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Description"
//                                 className="w-full p-2 border mb-2"
//                                 value={editProduct.description}
//                                 onChange={e => setEditProduct({ ...editProduct, description: e.target.value })}
//                             />
//                             <input
//                                 type="number"
//                                 placeholder="Starting Price"
//                                 className="w-full p-2 border mb-2"
//                                 value={editProduct.startingPrice}
//                                 onChange={e => setEditProduct({ ...editProduct, startingPrice: e.target.value })}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Status"
//                                 className="w-full p-2 border mb-2"
//                                 value={editProduct.productstatus}
//                                 onChange={e => setEditProduct({ ...editProduct, productstatus: e.target.value })}
//                             />
//                             <input
//                                 type="datetime-local"
//                                 name="auctionStartTimeDate"
//                                 value={editProduct.auctionStartTimeDate}
//                                 onChange={e => setEditProduct({ ...editProduct, auctionStartTimeDate: e.target.value })}
//                                 className="w-full p-2 border mb-2"
//                             />
//                             <input
//                                 type="datetime-local"
//                                 name="endTimeDate"
//                                 value={editProduct.endTimeDate}
//                                 onChange={e => setEditProduct({ ...editProduct, endTimeDate: e.target.value })}
//                                 className="w-full p-2 border mb-2"
//                             />
//                             <input
//                                 type="file"
//                                 className="w-full p-2 border mb-2"
//                                 onChange={e => setEditProduct({ ...editProduct, imageBlob: e.target.files[0] })}
//                             />
//                         </Modal.Body>
//                         <Modal.Footer>
//                             <Button variant="secondary" onClick={() => setEditProduct(null)}>Cancel</Button>
//                             <Button variant="primary" onClick={handleEditProduct}>Update Product</Button>
//                         </Modal.Footer>
//                     </Modal>
//                 )}
//             </div>
//         </>
//     );
// };

// export default AdminProductPage;
//************************************************************Version 3********************************************************/


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Modal, Button } from 'react-bootstrap'; // Import modal for adding products
// import 'tailwindcss/tailwind.css';
// import AdminNav from '../Components/AdminNav';

// const AdminProductPage = () => {
//     const [products, setProducts] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [editProduct, setEditProduct] = useState(null);
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [viewProduct, setViewProduct] = useState(null); // State for viewing product

//     const [newProduct, setNewProduct] = useState({
//         name: '',
//         imageBlob: null,
//         imageUrl: '',
//         description: '',
//         startingPrice: '',
//         auctionStartTimeDate: '',
//         endTimeDate: '',
//         productstatus: 'Available',
//         user: {
//             uid: 0
//         }
//     });

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/users/all');
//                 setUsers(response.data);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };
//         fetchUsers();
//     }, []);

//     useEffect(() => {
//         axios
//             .get('http://localhost:8000/products/all')
//             .then(response => setProducts(response.data))
//             .catch(err => console.log(err));
//     }, []);

//     const validateProductData = () => {
//         const now = new Date().toISOString();
//         const { auctionStartTimeDate, endTimeDate } = newProduct;
        
//         if (new Date(auctionStartTimeDate) < new Date(now)) {
//             alert('Auction start date cannot be in the past.');
//             return false;
//         }

//         if (new Date(endTimeDate) < new Date(now)) {
//             alert('End date cannot be in the past.');
//             return false;
//         }

//         if (new Date(endTimeDate) <= new Date(auctionStartTimeDate)) {
//             alert('End date should be after the auction start date.');
//             return false;
//         }

//         return true;
//     };

//     const handleAddProduct = async () => {
//         if (!validateProductData()) return;
//         try {
//             const data = new FormData();
//             data.append('name', newProduct.name);
//             data.append('description', newProduct.description);
//             data.append('startingPrice', newProduct.startingPrice);
//             data.append('productstatus', newProduct.productstatus);
//             data.append('auctionStartTimeDate', newProduct.auctionStartTimeDate);
//             data.append('endTimeDate', newProduct.endTimeDate);
//             data.append('imageUrl', newProduct.imageUrl);
//             data.append('user', newProduct.user.uid);
            
//             if (newProduct.imageBlob) {
//                 data.append('imageBlob', newProduct.imageBlob);
//             }

//             await axios.post('http://localhost:8000/products/create', data, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             setProducts([...products, newProduct]);
//             setShowAddModal(false);
//         } catch (error) {
//             console.error('Error adding product:', error);
//             alert("Failed to add product.");
//         }
//     };
    

//     const handleEditProduct = async () => {

//         try {
//             const formData = new FormData();
//             formData.append('name', editProduct.name);
//             formData.append('description', editProduct.description);
//             formData.append('startingPrice', editProduct.startingPrice);
//             formData.append('productstatus', editProduct.productstatus);
//             formData.append('auctionStartTimeDate', editProduct.auctionStartTimeDate);
//             formData.append('endTimeDate', editProduct.endTimeDate);
//             formData.append('imageUrl', editProduct.imageUrl);
//             formData.append('currentBiddingPrice',editProduct.currentBiddingPrice);
//             formData.append('user', editProduct.user.uid);
//               console.log(formData);
//             if (editProduct.imageBlob) {
//                 formData.append('imageBlob', editProduct.imageBlob);
//             }

//             await axios.put(`http://localhost:8000/products/update/${editProduct.productId}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             setProducts(products.map(product => 
//                 product.productId === editProduct.productId ? editProduct : product
//             ));
//             setEditProduct(null);
//         } catch (error) {
//             console.error('Error updating product:', error);
//             alert('Failed to update product.');
//         }
//     };

//     // Function to handle viewing product details
//     const handleViewProduct = (product) => {
//         setViewProduct(product);
//     };

//     return (
//         <>
//             <AdminNav />
//             <div className="container mx-auto p-4">
//                 <h2 className="text-2xl font-bold mb-4" role='header'>Admin Product Management</h2>

//                 <Button className="mb-4 bg-blue-500 text-white" onClick={() => setShowAddModal(true)}>
//                     Add Product
//                 </Button>

//                 {/* Product Table */}
//                 <table className="min-w-full bg-white border" role='tables'>
//                     <thead>
//                         <tr>
//                             <th className="py-2 px-4 border-b">Product ID</th>
//                             <th className="py-2 px-4 border-b">Name</th>
//                             <th className="py-2 px-4 border-b">Starting Price</th>
//                             <th className="py-2 px-4 border-b">Description</th>
//                             <th className="py-2 px-4 border-b">Status</th>
//                             <th className="py-2 px-4 border-b">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {products.map(product => (
//                             <tr key={product.productId}>
//                                 <td className="py-2 px-4 border-b">{product.productId}</td>
//                                 <td className="py-2 px-4 border-b">{product.name}</td>
//                                 <td className="py-2 px-4 border-b">${product.startingPrice}</td>
//                                 <td className="py-2 px-4 border-b">{product.description}</td>
//                                 <td className="py-2 px-4 border-b">{product.productstatus}</td>
//                                 <td className="py-2 px-4 border-b">
//                                     <Button 
//                                         role='edit'
//                                         className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
//                                         onClick={() => setEditProduct(product)}
//                                     >
//                                         Edit
//                                     </Button>
//                                     <Button
//                                         role='view'
//                                         className="bg-green-500 text-white py-1 px-2 rounded"
//                                         onClick={() => handleViewProduct(product)}
//                                     >
//                                         View
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 {/* Add Product Modal */}
//                 <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title role='title'>Add New Product</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <input
//                             type="text"
//                             placeholder="Product Name"
//                             className="w-full p-2 border mb-2"
//                             value={newProduct.name}
//                             onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
//                         />
//                         <input
//                             type="text"
//                             placeholder="Description"
//                             className="w-full p-2 border mb-2"
//                             value={newProduct.description}
//                             onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
//                         />
//                         <input
//                             type="number"
//                             placeholder="Starting Price"
//                             className="w-full p-2 border mb-2"
//                             value={newProduct.startingPrice}
//                             onChange={e => setNewProduct({ ...newProduct, startingPrice: e.target.value })}
//                         />
//                         <input
//                             type="text"
//                             placeholder="Status"
//                             className="w-full p-2 border mb-2"
//                             value={newProduct.productstatus}
//                             onChange={e => setNewProduct({ ...newProduct, productstatus: e.target.value })}
//                         />
//                         <input
//                             type="datetime-local"
//                             name="auctionStartTimeDate"
//                             value={newProduct.auctionStartTimeDate}
//                             onChange={e => setNewProduct({ ...newProduct, auctionStartTimeDate: e.target.value })}
//                             className="w-full p-2 border mb-2"
//                         />
//                         <input
//                             type="datetime-local"
//                             name="endTimeDate"
//                             value={newProduct.endTimeDate}
//                             onChange={e => setNewProduct({ ...newProduct, endTimeDate: e.target.value })}
//                             className="w-full p-2 border mb-2"
//                         />
//                         <input
//                             type="file"
//                             className="w-full p-2 border mb-2"
//                             onChange={e => setNewProduct({ ...newProduct, imageBlob: e.target.files[0] })}
//                         />
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
//                         <Button variant="primary" onClick={handleAddProduct} role='addprod'>Add Product</Button>
//                     </Modal.Footer>
//                 </Modal>

//                 {/* Edit Product Modal */}
//                 {editProduct && (
//                     <Modal show={true} onHide={() => setEditProduct(null)}>
//                         <Modal.Header closeButton>
//                             <Modal.Title>Edit Product</Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body>
//                             <input
//                                 type="text"
//                                 placeholder="Product Name"
//                                 className="w-full p-2 border mb-2"
//                                 value={editProduct.name}
//                                 onChange={e => setEditProduct({ ...editProduct, name: e.target.value })}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Description"
//                                 className="w-full p-2 border mb-2"
//                                 value={editProduct.description}
//                                 onChange={e => setEditProduct({ ...editProduct, description: e.target.value })}
//                             />
//                             <input
//                                 type="number"
//                                 placeholder="Starting Price"
//                                 className="w-full p-2 border mb-2"
//                                 value={editProduct.startingPrice}
//                                 onChange={e => setEditProduct({ ...editProduct, startingPrice: e.target.value })}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Status"
//                                 className="w-full p-2 border mb-2"
//                                 value={editProduct.productstatus}
//                                 onChange={e => setEditProduct({ ...editProduct, productstatus: e.target.value })}
//                             />
//                             <input
//                                 type="datetime-local"
//                                 name="auctionStartTimeDate"
//                                 value={editProduct.auctionStartTimeDate}
//                                 onChange={e => setEditProduct({ ...editProduct, auctionStartTimeDate: e.target.value })}
//                                 className="w-full p-2 border mb-2"
//                             />
//                             <input
//                                 type="datetime-local"
//                                 name="endTimeDate"
//                                 value={editProduct.endTimeDate}
//                                 onChange={e => setEditProduct({ ...editProduct, endTimeDate: e.target.value })}
//                                 className="w-full p-2 border mb-2"
//                             />
//                             <input
//                                 type="file"
//                                 className="w-full p-2 border mb-2"
//                                 onChange={e => setEditProduct({ ...editProduct, imageBlob: e.target.files[0] })}
//                             />
//                         </Modal.Body>
//                         <Modal.Footer>
//                             <Button variant="secondary" onClick={() => setEditProduct(null)}>Cancel</Button>
//                             <Button variant="primary" onClick={handleEditProduct}>Update Product</Button>
//                         </Modal.Footer>
//                     </Modal>
//                 )}

//                 {/* View Product Modal */}
//                 {viewProduct && (
//                     <Modal show={true} onHide={() => setViewProduct(null)}>
//                         <Modal.Header closeButton>
//                             <Modal.Title>View Product Details</Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body>
//                             <div className="text-center">
//                                 <img
                                    
//                                      src={`data:image/jpeg;base64,${viewProduct.imageBlob}`}
//                                     //                                 alt={product.name}
                                    
                                    
//                                     alt={viewProduct.name}
//                                     className="w-full h-48 object-cover mb-4"
//                                 />
//                                 <h3 className="text-xl font-bold">{viewProduct.name}</h3>
//                                 <p className="mb-2">{viewProduct.description}</p>
//                                 <p className="text-green-500 text-lg mb-2">${viewProduct.startingPrice}</p>
//                                 <p className="text-gray-500 mb-2">Status: {viewProduct.productstatus}</p>
//                                 <p className="text-gray-500">Auction Start: {new Date(viewProduct.auctionStartTimeDate).toLocaleString()}</p>
//                                 <p className="text-gray-500">End Time: {new Date(viewProduct.endTimeDate).toLocaleString()}</p>
//                             </div>
//                         </Modal.Body>
//                         <Modal.Footer>
//                             <Button variant="secondary" onClick={() => setViewProduct(null)}>Close</Button>
//                         </Modal.Footer>
//                     </Modal>
//                 )}
//             </div>
//         </>
//     );
// };

// export default AdminProductPage;

//********************************FINAL VERSION *************************

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; 
import 'tailwindcss/tailwind.css';
import AdminNav from '../Components/AdminNav';
import Swal from 'sweetalert2';
import { FaRupeeSign } from 'react-icons/fa';

const AdminProductPage = () => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [viewProduct, setViewProduct] = useState(null); 

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

   
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/users/all');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:8000/products/all')
            .then(response => setProducts(response.data))
            .catch(err => console.log(err));
    }, []);

    const validateProductData = () => {
        const now = new Date().toISOString();
        const { auctionStartTimeDate, endTimeDate } = newProduct;
        
        if (new Date(auctionStartTimeDate) < new Date(now)) {
            // alert('Auction start date cannot be in the past.');
            Swal.fire({
                title: 'Warning',
                text: 'Auction start date cannot be in the past. ',
                icon: 'error',
                customClass: {
                    popup: 'w-80 h-auto p-4 rounded-lg', // Tailwind classes for sizing
                    title: 'text-lg font-bold',
                    content: 'text-sm',
                    confirmButton: 'bg-red-500 text-white'
                  },
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
                text: 'End date cannot be in the past.',
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
        } catch (error) {
            console.error('Error adding product:', error);
            alert("Failed to add product.");
        }
    };
    

    const handleEditProduct = async () => {

        try {
            const formData = new FormData();
            formData.append('name', editProduct.name);
            formData.append('description', editProduct.description);
            formData.append('startingPrice', editProduct.startingPrice);
            formData.append('productstatus', editProduct.productstatus);
            formData.append('auctionStartTimeDate', editProduct.auctionStartTimeDate);
            formData.append('endTimeDate', editProduct.endTimeDate);
            formData.append('imageUrl', editProduct.imageUrl);
            formData.append('currentBiddingPrice',editProduct.currentBiddingPrice);
            formData.append('user', editProduct.user.uid);
            
            if (editProduct.imageBlob) {
                formData.append('imageBlob', editProduct.imageBlob);
            }

            await axios.put(`http://localhost:8000/products/update/${editProduct.productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setProducts(products.map(product => 
                product.productId === editProduct.productId ? editProduct : product
            ));
            setEditProduct(null);
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product.');
        }
    };

    const handleViewProduct = (product) => {
        setViewProduct(product);
    };

    
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <AdminNav />
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4" role='header'>Admin Product Management</h2>

                <Button className="mb-4 bg-blue-500 text-white" onClick={() => setShowAddModal(true)}>
                    Add Product
                </Button>

                {/* Product Table */}
                <table className="min-w-full bg-white border" role='tables'>
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Product ID</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Starting Price</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map(product => (
                            <tr key={product.productId}>
                                <td className="py-2 px-4 border-b">{product.productId}</td>
                                <td className="py-2 px-4 border-b">{product.name}</td>
                                <td className="py-2 px-4 border-b">{product.startingPrice}</td>
                                <td className="py-2 px-4 border-b">{product.description}</td>
                                <td className="py-2 px-4 border-b">{product.productstatus}</td>
                                <td className="py-2 px-4 border-b">
                                    <Button 
                                        role='edit'
                                        className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                                        onClick={() => setEditProduct(product)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        role='view'
                                        className="bg-green-500 text-white py-1 px-2 rounded"
                                        onClick={() => handleViewProduct(product)}
                                    >
                                        View
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="mt-4 flex justify-between items-center">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    >
                        Previous
                    </button>
                    <div className="text-gray-700">
                        Page {currentPage} of {totalPages}
                    </div>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    >
                        Next
                    </button>
                </div>

                {/* Add Product Modal */}
                <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title role='title'>Add New Product</Modal.Title>
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
                        <Button variant="primary" onClick={handleAddProduct} role='addprod'>Add Product</Button>
                    </Modal.Footer>
                </Modal>

                {/* Edit Product Modal */}
                {editProduct && (
                    <Modal show={true} onHide={() => setEditProduct(null)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input
                                type="text"
                                placeholder="Product Name"
                                className="w-full p-2 border mb-2"
                                value={editProduct.name}
                                onChange={e => setEditProduct({ ...editProduct, name: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                className="w-full p-2 border mb-2"
                                value={editProduct.description}
                                onChange={e => setEditProduct({ ...editProduct, description: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Starting Price"
                                className="w-full p-2 border mb-2"
                                value={editProduct.startingPrice}
                                onChange={e => setEditProduct({ ...editProduct, startingPrice: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Status"
                                className="w-full p-2 border mb-2"
                                value={editProduct.productstatus}
                                onChange={e => setEditProduct({ ...editProduct, productstatus: e.target.value })}
                            />
                            <input
                                type="datetime-local"
                                name="auctionStartTimeDate"
                                value={editProduct.auctionStartTimeDate}
                                onChange={e => setEditProduct({ ...editProduct, auctionStartTimeDate: e.target.value })}
                                className="w-full p-2 border mb-2"
                            />
                            <input
                                type="datetime-local"
                                name="endTimeDate"
                                value={editProduct.endTimeDate}
                                onChange={e => setEditProduct({ ...editProduct, endTimeDate: e.target.value })}
                                className="w-full p-2 border mb-2"
                            />
                            <input
                                type="file"
                                className="w-full p-2 border mb-2"
                                onChange={e => setEditProduct({ ...editProduct, imageBlob: e.target.files[0] })}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setEditProduct(null)}>Cancel</Button>
                            <Button variant="primary" onClick={handleEditProduct}>Update Product</Button>
                        </Modal.Footer>
                    </Modal>
                )}

                {/* View Product Modal */}
                {viewProduct && (
                    <Modal show={true} onHide={() => setViewProduct(null)}>
                        <Modal.Header closeButton>
                            <Modal.Title>View Product Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="text-center">
                                <img
                                    src={`data:image/jpeg;base64,${viewProduct.imageBlob}`}
                                    alt={viewProduct.name}
                                    className="w-full h-48 object-cover mb-4"
                                />
                                <h3 className="text-xl font-bold">{viewProduct.name}</h3>
                                <p className="mb-2">{viewProduct.description}</p>
                                <p className="text-green-500 text-lg mb-2">RS :{viewProduct.startingPrice}</p>
                                <p className="text-gray-500 mb-2">Status: {viewProduct.productstatus}</p>
                                <p className="text-gray-500">Auction Start: {new Date(viewProduct.auctionStartTimeDate).toLocaleString()}</p>
                                <p className="text-gray-500">End Time: {new Date(viewProduct.endTimeDate).toLocaleString()}</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setViewProduct(null)}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </div>
        </>
    );
};

export default AdminProductPage;
