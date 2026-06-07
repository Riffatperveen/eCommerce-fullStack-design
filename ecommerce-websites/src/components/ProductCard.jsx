import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
      {/* Product Image - with aspect ratio fix */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
          srcSet={product.image}
        />
        {!product.stock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-sm md:text-base">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 md:p-4 flex-grow flex flex-col">
        <p className="text-xs text-gray-700 uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-sm md:text-base text-gray-800 hover:text-blue-600 transition line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mt-2 mb-3">
          <div className="flex text-yellow-400 text-sm md:text-base">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(product.rating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-800 ml-2">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg md:text-xl font-bold text-blue-600">${product.price}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Link
            to={`/product/${product._id}`}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-3 md:px-4 rounded hover:bg-gray-300 transition text-center text-xs md:text-sm font-medium"
          >
            View
          </Link>
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.stock}
            className="flex-1 bg-blue-600 text-white py-2 px-3 md:px-4 rounded hover:bg-blue-700 transition text-xs md:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
