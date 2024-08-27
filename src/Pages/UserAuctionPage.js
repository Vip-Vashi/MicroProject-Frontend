// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaBell, FaWallet, FaCreditCard, FaPaypal, FaGoogleWallet, FaRupeeSign, FaGooglePay, FaBackward, FaArrowLeft } from 'react-icons/fa';
// import CreditCardModal from './CreditCardModal';
// import UPIModal from './UPIModal';
// import BidHistory from './Bidhistory';
// import WalletModal from './WalletModal';
// import { useNavigate } from 'react-router-dom';

// function UserAuctionPage() {
//   const [winnings, setWinnings] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [walletAmount, setWalletAmount] = useState(0); 
//   const [loading, setLoading] = useState(false);
//   const [userProfile,setuserProfile]=useState([]);
//   const [paymentModal, setPaymentModal] = useState(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const userId = sessionStorage.getItem('userid');


//     axios.get(`http://localhost:8000/users/${userId}`)
//     .then(response => {
//       console.log(response.data)
//       setuserProfile(response.data)
      
//     //   setuserProfile(response.data.filter(u=>u.uid == userId));
//       console.log(userProfile)
//       setWalletAmount(parseFloat(parseFloat( userProfile.walletAmt)) )
//       console.log(walletAmount);
//     })
//     .catch(error => console.error('Error fetching user:', error));

// // sessionStorage.setItem('walletamt',walletAmount);


//     axios.get('http://localhost:8000/winners/all')
//       .then(response => {
//         console.log(response.data)

//         const userWinnings = response.data.filter(winning => winning.product.user.uid == userId);
//         setWinnings(userWinnings);
       
//       })
//       .catch(error => console.error('Error fetching winnings:', error));
//   }, []);

//   // Handle payment click
// //   const handlePayment = () => {
// //     setLoading(true);
// //     setTimeout(() => {
// //       setLoading(false);
// //       setWalletAmount(walletAmount);
// //       alert('Payment successful! Wallet has been updated.');
// //       setSidebarOpen(false);
// //     }, 2000);
// //   };
// const handlePayment = (paymentDetails) => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     //   setWalletAmount
//     console.log(parseFloat(walletAmount));
//     console.log(paymentDetails.amount);
//       const wal=parseFloat(userProfile.walletAmt) - parseFloat(paymentDetails.amount);
//     //   setuserProfile(walletAmount)
//     console.log(wal);
//     const formdata = new FormData;
//     formdata.append("WalletAmt", wal)
//       axios.put(`http://localhost:8000/users/updatewallet/${userProfile.uid}`,formdata
//       )
//       .then(response => {
//         console.log(response.data)
//         // setuserProfile(response.data)
//       //   setuserProfile(response.data.filter(u=>u.uid == userId));
//         console.log(userProfile)
//         setWalletAmount(( userProfile.walletAmt))
//       })
//       .catch(error => console.error('Error updating user:', error));
//     //   const amt = walletAmount;
//     //   sessionStorage.setItem('walletamt',amt);
//        // Example logic, adjust as needed
//       alert('Payment successful! Wallet has been updated.');
//       window.location.reload();
//       setSidebarOpen(false);
//       setPaymentModal(null);
//     }, 2000);
//   };


//   const walletPayment = (paymentDetails) => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     //   setWalletAmount
//       const wal=parseFloat(paymentDetails.amount) + parseFloat(userProfile.walletAmt);
//     //   setuserProfile(walletAmount)
//     console.log(wal);
//     const formdata = new FormData;
//     formdata.append("WalletAmt",parseFloat(wal))
//       axios.put(`http://localhost:8000/users/updatewallet/${userProfile.uid}`,formdata
//       )
//       .then(response => {
//         console.log(response.data)
//         // setuserProfile(response.data)
//       //   setuserProfile(response.data.filter(u=>u.uid == userId));
//         console.log(userProfile)
//         setWalletAmount(( userProfile.walletAmt))
//       })
//       .catch(error => console.error('Error updating user:', error));
//     //   const amt = walletAmount;
//     //   sessionStorage.setItem('walletamt',amt);
//        // Example logic, adjust as needed
//       alert('Payment to  Wallet has been updated.');
//       window.location.reload();
//       setSidebarOpen(false);
//       setPaymentModal(null);
//     }, 2000);
//   };

//   const formatDate = (dateTimeString) => {
//     const date = new Date(dateTimeString);
//     return date.toLocaleDateString(); // Formats date as "MM/DD/YYYY" or based on locale
//   };

 
  
//   const handleGoBack = () => {
//     navigate(-1);
//   };
 


// console.log(walletAmount)
//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       {/* Header */}
//       <div className="flex justify-between items-center p-4 bg-white shadow-md">
//       <button className="go-back-button" onClick={handleGoBack}>
//               {/* <img src='https://irp.cdn-website.com/27143412/dms3rep/multi/Atterberry-Symbol---3-Color.png'
//                width={120} 
//                height={50}
              
//               ></img> */}
//               <FaArrowLeft/>
//             </button>
//         <h1 className="text-2xl font-semibold">Auction Dashboard</h1>
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <FaBell className="text-2xl text-gray-700 cursor-pointer" />
//             {winnings.length > 0 && (
//               <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
//                 {winnings.length}
//               </span>
//             )}
//           </div>
//           <FaWallet 
//             className="text-2xl text-gray-700 cursor-pointer"
//             onClick={() => setSidebarOpen(true)}
//           />
//         </div>
//       </div>

//       {/* Winnings Table */}
//       <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
//         <div className="px-4 py-3 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-800">Your Winnings</h2>
//         </div>
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bid Amount</th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>

//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auction Date</th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
//             </tr>
//           </thead>
//           <tbody>
//             {winnings.map((winning, index) => (
//               <tr key={index}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{winning.product.name}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">RS :{winning.product.currentBiddingPrice}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Won</td>
                
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"> {formatDate(winning.product.endTimeDate)}</td>

//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">

//                 <button className="w-min py-2 px-4 flex items-center justify-center bg-green-600 text-white rounded hover:bg-green-700"
            
//             onClick={() => setSidebarOpen(true)}
//             >
//               <FaRupeeSign className="mr-2" /> Pay 
//             </button>


//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Sidebar */}
//       <div 
//         className={`fixed top-0 right-0 w-80 bg-white shadow-lg h-full z-50 transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
//       >
//         <div className="p-4 flex justify-between items-center border-b border-gray-200">
//           <h2 className="text-lg font-semibold">Payment Options</h2>
//           <button onClick={() => setSidebarOpen(false)} className="text-gray-700 hover:text-gray-900">✕</button>
//         </div>
//         <div className="p-4">
//           <div className="mb-4">
//             <h3 className="text-gray-700 font-medium">Wallet Amount: ${userProfile.walletAmt}</h3>
//           </div>
//           <div className="space-y-4">
//             <button className="w-full py-2 px-4 flex items-center justify-center bg-blue-600 text-white rounded hover:bg-blue-700"
//              onClick={() => { setPaymentModal('creditCard'); }}
//             >
//               <FaCreditCard className="mr-2" /> Pay with Credit Card
//             </button>
//             <button className="w-full py-2 px-4 flex items-center justify-center bg-green-600 text-white rounded hover:bg-green-700"
            
//             onClick={() => { setPaymentModal('upi'); }}
//             >
//               <FaPaypal className="mr-2" /> Pay with PayPal
//             </button>
//             <button className="w-full py-2 px-4 flex items-center justify-center bg-yellow-600 text-white rounded hover:bg-yellow-700"
//             onClick={() => { setPaymentModal('upi'); }}
            
//             >
//               <FaGooglePay className="mr-2" /> Pay with Gpay
//             </button>

//             <button className="w-full py-2 px-4 flex items-center justify-center bg-gray-500 text-white rounded hover:bg-blue-500"
//             onClick={() => { setPaymentModal('wallet'); }}
            
//             >
//               <FaGoogleWallet className="mr-2" /> Pay with Google Wallet
//             </button>
            
//           </div>
//           <div className="mt-6">
//             <button 
//               onClick={handlePayment}
//               disabled={loading}
//               className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center space-x-2">
//                   <div className="w-4 h-4 border-t-2 border-white border-solid rounded-full animate-spin"></div>
//                   <span>Processing...</span>
//                 </div>
//               ) : (
//                 <span>Pay</span>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* Modals */}
//       <CreditCardModal
//         show={paymentModal === 'creditCard'}
//         handleClose={() => setPaymentModal(null)}
//         handlePayment={handlePayment}
//       />
//       <UPIModal
//         show={paymentModal === 'upi'}
//         handleClose={() => setPaymentModal(null)}
//         handlePayment={handlePayment}
//       />
//        <WalletModal
//         show={paymentModal === 'wallet'}
//         handleClose={() => setPaymentModal(null)}
//         walletPayment={walletPayment}
//       />
//       <BidHistory/>
//     </div>
//   );
// }

// export default UserAuctionPage;
//*********************************************FINAL VERSION****************************** */









import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBell, FaWallet, FaCreditCard, FaPaypal, FaGoogleWallet, FaRupeeSign, FaGooglePay, FaBackward, FaArrowLeft } from 'react-icons/fa';
import CreditCardModal from './CreditCardModal';
import UPIModal from './UPIModal';
import WalletModal from './WalletModal';
import BidHistory from './Bidhistory';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function UserAuctionPage() {
  const [winnings, setWinnings] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [walletAmount, setWalletAmount] = useState(0); 
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [paymentModal, setPaymentModal] = useState(null);
  const [selectedWinning, setSelectedWinning] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem('userid');

    // Fetch user profile
    axios.get(`http://localhost:8000/users/${userId}`)
      .then(response => {
        const userData = response.data;
        setUserProfile(userData);
        setWalletAmount(parseFloat(userData.walletAmt) || 0); // Ensure default value
      })
      .catch(error => console.error('Error fetching user:', error));

   
    axios.get('http://localhost:8000/winners/all')
      .then(response => {
        const userWinnings = response.data.filter(winning => winning.product.user.uid == userId);
        const updatedWinnings = userWinnings.map(winning => ({
          ...winning,
          paid: JSON.parse(sessionStorage.getItem(`paymentStatus_${winning.product.productId}`)) || winning.paid || false
        }));
        setWinnings(updatedWinnings);
      })
      .catch(error => console.error('Error fetching winnings:', error));


    


  }, []);



  

  const handlePayment = (paymentDetails, winning) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (userProfile && walletAmount>= paymentDetails.amount) {
        const newWalletAmount = walletAmount - parseFloat(paymentDetails.amount);
        const formData = new FormData();
        formData.append("WalletAmt", newWalletAmount);

        axios.put(`http://localhost:8000/users/updatewallet/${userProfile.uid}`, formData)
          .then(response => {
            setWalletAmount(newWalletAmount);
            const updatedWinnings = winnings.map(w =>
              w.product.productId === winning.product.productId
                ? { ...w, paid: true }
                : w
            );
            setWinnings(updatedWinnings);
            sessionStorage.setItem(`paymentStatus_${winning.product.productId}`, true);

            // alert('Payment successful! Wallet has been updated.');
            Swal.fire({
              title: 'Success ',
              text: 'Payment Successfully Done !!',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          })
          .catch(error => console.error('Error updating user:', error));
      }
      Swal.fire({
        title: 'Failed ',
        text: 'Payment Failed ..Insufficient Wallet Balance !!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      setSidebarOpen(false);
      setPaymentModal(null);
    }, 2000);
  };

  const walletPayment = (paymentDetails) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (userProfile) {
        const newWalletAmount = parseFloat(walletAmount) + parseFloat(paymentDetails.amount);
        const formData = new FormData();
        formData.append("WalletAmt", newWalletAmount);

        axios.put(`http://localhost:8000/users/updatewallet/${userProfile.uid}`, formData)
          .then(response => {
            setWalletAmount(newWalletAmount);
            // alert('Payment to Wallet has been updated.');
            Swal.fire({
              title: 'Success ',
              text: 'Payment to Wallet has been updated !!',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          })
          .catch(error => console.error('Error updating user:', error));
      }
      setSidebarOpen(false);
      setPaymentModal(null);
    }, 2000);
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString();
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const getButtonStyles = (paid) => {
    return paid ? 'bg-blue-600 text-white' : 'bg-green-600 text-white';
  };

  const getButtonText = (paid) => {
    return paid ? 'Paid' : 'Pay';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <button className="go-back-button" onClick={handleGoBack}>
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-semibold">Auction Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FaBell className="text-2xl text-gray-700 cursor-pointer" />
            {winnings.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {winnings.length}
              </span>
            )}
          </div>
          <FaWallet 
            className="text-2xl text-gray-700 cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          />
        </div>
      </div>

      {/* Winnings Table */}
      <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Your Winnings</h2>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bid Amount</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auction Date</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
            </tr>
          </thead>
          <tbody>
            {winnings.map((winning, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{winning.product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">RS :{winning.product.currentBiddingPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{winning.paid ? 'Paid' : 'Won'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(winning.product.endTimeDate)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button 
                    className={`w-min py-2 px-4 flex items-center justify-center rounded ${getButtonStyles(winning.paid)}`}
                    onClick={() => {
                      if (!winning.paid) {
                        setSelectedWinning(winning);
                        setSidebarOpen(true);
                      }
                    }}
                    disabled={winning.paid}
                  >
                    {getButtonText(winning.paid)}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 w-80 bg-white shadow-lg h-full z-50 transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-lg font-semibold">Payment Options</h2>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-700 hover:text-gray-900">✕</button>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-gray-700 font-medium">Wallet Amount: ${walletAmount}</h3>
          </div>
          <div className="space-y-4">
           
            <button className="w-full py-2 px-4 flex items-center justify-center bg-green-600 text-white rounded hover:bg-green-700" onClick={() => setPaymentModal('upi')}>
              <FaWallet className="mr-2" />Pay for Product from wallet
            </button>
            {/* <button className="w-full py-2 px-4 flex items-center justify-center bg-yellow-600 text-white rounded hover:bg-yellow-700" onClick={() => setPaymentModal('upi')}>
              <FaGooglePay className="mr-2" /> Pay with Google Pay
            </button> */}
            <button className="w-full py-2 px-4 flex items-center justify-center bg-yellow-600 text-white rounded hover:bg-yellow-700" onClick={() => setPaymentModal('creditCard')}>
              <FaCreditCard className="mr-2" /> Pay with  Card for Wallet
            </button>
            <button className="w-full py-2 px-4 flex items-center justify-center bg-gray-500 text-white rounded hover:bg-gray-600" onClick={() => setPaymentModal('wallet')}>
              <FaGoogleWallet className="mr-2" /> Pay with UPI For  Wallet
            </button>
          </div>
          <div className="mt-6">
            <button 

              onClick={handlePayment}
              disabled={loading}
              
              
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-t-2 border-white border-solid rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                 <span>close</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreditCardModal
        show={paymentModal === 'creditCard'}
        handleClose={() => setPaymentModal(null)}
        walletPayment={walletPayment}
      />
      <UPIModal
        show={paymentModal === 'upi'}
        handleClose={() => setPaymentModal(null)}
        handlePayment={(details) => handlePayment(details, selectedWinning)}
      />
        {/* <UPIModal
        show={paymentModal === 'googlePay'}
        handleClose={() => setPaymentModal(null)}
        handlePayment={(details) => handlePayment(details, selectedWinning)}
      /> */}
      <WalletModal
        show={paymentModal === 'wallet'}
        handleClose={() => setPaymentModal(null)}
        walletPayment={walletPayment}
      />
      <BidHistory />
    </div>
  );
}

export default UserAuctionPage;