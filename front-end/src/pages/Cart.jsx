import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate = useNavigate();

  const { user } = useAuthContext();

  const [cart, setCart] = useState([]);

  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', quantity: 10 },
    { id: 2, name: 'Product 2', quantity: 5 },
    { id: 3, name: 'Product 3', quantity: 7 },
    { id: 4, name: 'Product 4', quantity: 3 },
  ]);

  useEffect(() => {
    if (!user || user.isSuperuser) {
      navigate('/');
    }
  }, [user]);

  const handleAddToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product && product.quantity > 0) {
      setProducts(
        products.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        )
      );
      setCart([...cart, product]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    const productIndex = cart.findIndex((p) => p.id === productId);
    if (productIndex !== -1) {
      setProducts(
        products.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
      const newCart = [...cart];
      newCart.splice(productIndex, 1);
      setCart(newCart);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {cart.length === 0 ? (
            <div className="bg-white shadow-md rounded-lg px-4 py-4">
              <h2 className="text-lg font-medium text-gray-700">Your Cart</h2>
              <div className="mt-4">
                <p className="text-gray-500">Your cart is currently empty.</p>
                <p className="mt-2">Here are some products you might be interested in:</p>
                <ul className="mt-2 list-disc list-inside">
                  <li>Product 1</li>
                  <li>Product 2</li>
                  <li>Product 3</li>
                </ul>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  onClick={() => navigate('/')}
                >
                  Start Shopping
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-lg px-4 py-4">
              <h2 className="text-lg font-medium text-gray-700">Your Cart</h2>
<div className="mt-4">
{cart.map((product) => (
<div key={product.id} className="flex justify-between items-center border-b-2 border-gray-300 py-2">
<div>
<h3 className="text-md font-medium text-gray-700">{product.name}</h3>
<p className="text-gray-500">Quantity: 1</p>
</div>
<div className="flex items-center space-x-2">
<button
className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
onClick={() => handleRemoveFromCart(product.id)}
>
Remove
</button>
</div>
</div>
))}
</div>
<div className="mt-8 flex justify-end">
<button
className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 mr-4"
onClick={() => navigate('/')}
>
Continue Shopping
</button>
<button
className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
onClick={() => setCart([])}
>
Clear Cart
</button>
</div>
</div>
)}
<div className="mt-8">
<h3 className="text-lg font-medium text-gray-700">Best Selling Products</h3>
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
{products.map((product) => (
<div key={product.id} className="bg-white shadow-md rounded-lg px-4 py-6">
<h4 className="text-md font-medium text-gray-700">{product.name}</h4>
<p className="text-gray-500">Available: {product.quantity}</p>
<div className="mt-4 flex items-center space-x-2">
<button
className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
onClick={() => handleAddToCart(product.id)}
disabled={product.quantity === 0}
>
Add to Cart
</button>
<div className="relative">
<button
className="px-2 py-1 bg-gray-300 text-gray-700 rounded-md"
disabled={product.quantity === 0}
>
{product.quantity > 0 && "-"}
</button>
<span className="absolute inset-y-0 left-0 right-0 flex items-center justify-center font-medium text-gray-700">
{product.quantity}
</span>
<button
className="px-2 py-1 bg-gray-300 text-gray-700 rounded-md"
onClick={() => setProducts(
products.map((p) =>
p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
)
)}
>
+
</button>
</div>
</div>
</div>
))}
</div>
</div>
</div>
</div>
</div>
);
}
