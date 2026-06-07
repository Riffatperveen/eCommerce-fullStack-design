import { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import { fetchFeaturedProducts } from '../services/api';

function HomePage({ onAddToCart }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchFeaturedProducts();
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div>
      <HeroSection />

      <section className="py-12 md:py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Featured Products
            </h2>
            <p className="text-sm md:text-base text-gray-800 max-w-2xl mx-auto px-2">
              Check out our best-selling items and new arrivals
            </p>
          </div>

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-8 md:py-12 lg:py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Explore More Products</h2>
          <p className="text-sm md:text-base text-blue-100 mb-4 md:mb-6">
            Browse our complete collection of electronics and accessories
          </p>
          <a
            href="/products"
            className="inline-block bg-white text-blue-600 font-bold py-2 md:py-3 px-6 md:px-8 rounded-lg hover:bg-blue-50 transition text-sm md:text-base"
          >
            View All Products
          </a>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
