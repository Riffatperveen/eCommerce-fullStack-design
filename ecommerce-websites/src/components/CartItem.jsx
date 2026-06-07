import { Link } from 'react-router-dom';

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 py-4 border-b border-gray-200">
      {/* Product Image */}
      <Link to={`/product/${item._id}`} className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 sm:w-24 h-20 sm:h-24 object-cover rounded hover:opacity-80 transition"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-grow">
        <Link to={`/product/${item._id}`}>
          <h3 className="font-semibold text-sm sm:text-base text-gray-800 hover:text-blue-600 transition">
            {item.name}
          </h3>
        </Link>
        <p className="text-gray-800 text-xs sm:text-sm mt-1">{item.category}</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-3">
          {/* Quantity Control */}
          <div className="flex items-center border border-gray-300 rounded">
            <button
              onClick={() => onUpdateQuantity(item._id, Math.max(1, item.quantity - 1))}
              className="px-2 sm:px-3 py-1 text-gray-800 hover:bg-gray-100 text-sm"
            >
              −
            </button>
            <span className="px-2 sm:px-3 py-1 text-gray-800 text-sm">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
              className="px-2 sm:px-3 py-1 text-gray-800 hover:bg-gray-100 text-sm"
            >
              +
            </button>
          </div>

          {/* Price */}
          <div className="sm:ml-auto text-right">
            <p className="text-lg sm:text-xl font-bold text-blue-600">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <p className="text-xs text-gray-800">${item.price} each</p>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item._id)}
        className="text-red-600 hover:text-red-800 transition font-medium text-xs sm:text-sm self-start sm:self-center whitespace-nowrap"
      >
        Remove
      </button>
    </div>
  );
}

export default CartItem;
