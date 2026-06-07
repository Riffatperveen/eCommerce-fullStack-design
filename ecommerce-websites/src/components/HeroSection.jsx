import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Content */}
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Premium Electronics & Accessories
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-blue-100">
              Discover our curated collection of high-quality products at unbeatable prices.
            </p>
            <Link
              to="/products"
              className="inline-block bg-white text-blue-600 font-bold py-2 md:py-3 px-6 md:px-8 rounded-lg hover:bg-blue-50 transition text-sm md:text-base"
            >
              Shop Now
            </Link>
          </div>

          {/* Image */}
          <div className="flex justify-center hidden md:flex">
            <div className="bg-white/10 rounded-lg p-4 md:p-8 backdrop-blur max-w-xs md:max-w-md">
              <svg
                className="w-full h-auto text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 6h-3V5c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v1h-2V5c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v1H2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-3-1h2v1h-2V5zm-7 0h2v1h-2V5zM2 8h18v12H2V8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Features - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-12 md:mt-20">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold mb-2">Fast Shipping</h3>
            <p className="text-sm md:text-base text-blue-100">Free shipping on orders over $50</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold mb-2">Quality Guaranteed</h3>
            <p className="text-sm md:text-base text-blue-100">All products are authentic and tested</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold mb-2">Easy Returns</h3>
            <p className="text-sm md:text-base text-blue-100">30-day money-back guarantee</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
