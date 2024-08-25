import React from 'react';

const UserDetailsModal = ({ user, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-semibold">User Details</h2>
                {user ? (
                    <div className="mt-4">
                        <p><strong>Name:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.contact}</p>
                        <p><strong>Address:</strong> {user.address}</p>
                    </div>
                ) : (
                    <p>Loading user details...</p>
                )}
                <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default UserDetailsModal;
