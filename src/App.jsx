import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import AdminPanelPage from './pages/AdminPanelPage';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (error) {
        console.error('Error loading cart:', error);
        return [];
      }
    }
    return [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Update item quantity
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
  };

  // Clear entire cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Calculate cart count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header cartCount={cartCount} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
            <Route
              path="/products"
              element={<ProductListingPage onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/product/:id"
              element={<ProductDetailsPage onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  cartItems={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveFromCart}
                  onClearCart={handleClearCart}
                />
              }
            />
            <Route path="/admin" element={<AdminPanelPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
