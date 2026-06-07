import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';

function CartPage({ cartItems, onUpdateQuantity, onRemove, onClearCart }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 50 ? 0 : 10; // Free shipping over $50
  const total = subtotal + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="w-24 h-24 text-gray-800 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-800 mb-8">
              Add some products to get started!
            </p>
            <Link
              to="/products"
              className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Page Header */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 md:mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">
                {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart
              </h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemove}
                  />
                ))}
              </div>

              {/* Continue Shopping Button */}
              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t">
                <Link
                  to="/products"
                  className="text-blue-600 hover:text-blue-800 font-semibold text-sm md:text-base"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 lg:sticky lg:top-20">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-800">Subtotal:</span>
                  <span className="font-semibold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-800">Shipping:</span>
                  <span className="font-semibold text-gray-900">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-800">Tax (10%):</span>
                  <span className="font-semibold text-gray-900">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                {shipping === 0 && (
                  <div className="p-2 bg-green-50 border border-green-200 rounded text-xs md:text-sm text-green-700">
                    ✓ Free shipping applied!
                  </div>
                )}
              </div>

              <div className="border-t pt-3 md:pt-4 mb-4 md:mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900 text-base md:text-lg">Total:</span>
                  <span className="text-xl md:text-2xl font-bold text-blue-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={() => {
                  alert("Order Placed Successfully! Thank you for your purchase.");
                  onClearCart();
                }}
                className="w-full bg-blue-600 text-white font-bold py-2 md:py-3 px-6 rounded-lg hover:bg-blue-700 transition text-sm md:text-base lg:text-lg"
              >
                Proceed to Checkout
              </button>

              {/* Additional Info */}
              <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t space-y-2 md:space-y-3 text-xs md:text-sm text-gray-800">
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span>Secure checkout powered by trusted payment providers</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span>30-day money-back guarantee on all products</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
