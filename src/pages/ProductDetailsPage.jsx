import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById, fetchProducts } from '../services/api';

function ProductDetailsPage({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        
        // Fetch related products from same category
        const allProducts = await fetchProducts();
        setRelatedProducts(allProducts.filter(p => p.category === data.category && p._id !== data._id));
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <Link
            to="/products"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-gray-800">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex items-center justify-center">
            <div className="w-full aspect-square overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 md:p-8 flex flex-col justify-between">
            <div>
              <p className="text-blue-600 text-xs md:text-sm font-semibold uppercase tracking-wide">
                {product.category}
              </p>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mt-2">
                {product.name}
              </h1>

              <div className="flex items-center mt-4 flex-wrap gap-2">
                <div className="flex text-yellow-400 text-xl md:text-2xl">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(product.rating || 0) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <span className="text-gray-800 text-sm md:text-base">
                  {product.rating || 0} ({product.reviews || 0} reviews)
                </span>
              </div>

              <div className="mt-6">
                <p className="text-3xl md:text-4xl font-bold text-blue-600">
                  ${product.price}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {product.description}
                </p>
              </div>

              <div className="mt-6">
                {product.stock > 0 ? (
                  <p className="text-green-600 font-semibold text-sm md:text-base">
                    ✓ In Stock - {product.stock} available
                  </p>
                ) : (
                  <p className="text-red-600 font-semibold text-sm md:text-base">
                    Out of Stock - Coming soon
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 space-y-4 border-t pt-8">
              <div className="flex items-center space-x-4 flex-wrap gap-2">
                <label className="font-semibold text-gray-900 text-sm md:text-base">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={product.stock === 0}
                    className="px-3 md:px-4 py-2 text-gray-800 hover:bg-gray-100 disabled:opacity-50 text-sm md:text-base"
                  >
                    −
                  </button>
                  <span className="px-4 md:px-6 py-2 text-gray-800 font-semibold text-sm md:text-base">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={product.stock === 0 || quantity >= product.stock}
                    className="px-3 md:px-4 py-2 text-gray-800 hover:bg-gray-100 disabled:opacity-50 text-sm md:text-base"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-base md:text-lg"
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t">
                <div>
                  <p className="text-gray-800 text-xs md:text-sm">Shipping</p>
                  <p className="font-semibold text-gray-900 text-sm md:text-base">
                    Free on orders over $50
                  </p>
                </div>
                <div>
                  <p className="text-gray-800 text-xs md:text-sm">Returns</p>
                  <p className="font-semibold text-gray-900 text-sm md:text-base">30-day guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <Link key={relatedProduct._id} to={`/product/${relatedProduct._id}`}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full">
                    <div className="w-full aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="font-semibold text-gray-800 line-clamp-2 text-sm md:text-base">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-blue-600 font-bold mt-2 text-sm md:text-base">
                        ${relatedProduct.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailsPage;
