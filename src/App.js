import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Books from './pages/Books';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import BookPage from './pages/BookPage';
import NewArrivals from './pages/NewArrivals';
import BoxSets from './pages/BoxSets';
import Bestsellers from './pages/Bestsellers';
import FictionBooks from './pages/FictionBooks';
import AwardWinners from './pages/AwardWinners';
import FeaturedAuthors from './pages/FeaturedAuthors';
import TodaysDeal from './pages/TodaysDeal';
// Removed import of RequestBook as per user request
import DonateBook from './pages/DonateBook';
import Wishlist from './pages/Wishlist';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import MyRented from './pages/MyRented';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            {/* Removed Header as per user request */}
            {/* <Header /> */}
            <TopBar />
            <main style={{ padding: '20px', paddingBottom: '60px' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Books />} />
                <Route path="/book/:id" element={<BookPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/my-rented" element={<MyRented />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/new-arrivals" element={<NewArrivals />} />
                <Route path="/box-sets" element={<BoxSets />} />
                <Route path="/bestsellers" element={<Bestsellers />} />
                <Route path="/fiction-books" element={<FictionBooks />} />
                <Route path="/award-winners" element={<AwardWinners />} />
                <Route path="/featured-authors" element={<FeaturedAuthors />} />
                <Route path="/todays-deal" element={<TodaysDeal />} />
                {/* Removed Route for /request-book as per user request */}
                <Route path="/donate-book" element={<DonateBook />} />
              </Routes>
            </main>
            <Footer />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
