import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-lg p-4 bg-white shadow-md" >
            <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-lg font-bold mt-2">{product.name}</h3>
            <p>{product.description}</p>
            <p className="text-gray-700 mt-2">Starting Price: ${product.startingPrice}</p>
        </div>
    );
};

export default ProductCard;
