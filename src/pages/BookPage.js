import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import books from '../data/books';
import { CartContext } from '../contexts/CartContext';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

const BookPage = () => {
  const { id } = useParams();
  const book = books.find(b => b.id.toString() === id);
  const { addToCart } = useContext(CartContext);

  // State to hold reviews for this book
  const [reviews, setReviews] = useState([]);

  const addReview = (review) => {
    setReviews(prevReviews => [...prevReviews, review]);
  };

  if (!book) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <Link to="/books" style={{ color: '#d0021b', fontWeight: 'bold', textDecoration: 'none' }}>
          &larr; Back to Books
        </Link>
        <p style={{ marginTop: '20px', color: '#d0021b' }}>Book not found.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#fff0f0', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: '600px', width: '100%', backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 0 25px rgba(208, 2, 27, 0.4)', textAlign: 'center' }}>
        <Link to="/books" style={{ color: '#d0021b', fontWeight: 'bold', textDecoration: 'none', marginBottom: '20px', display: 'inline-block', textAlign: 'left' }}>
          &larr; Back to Books
        </Link>
        <img src={book.cover} alt={book.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 0 15px rgba(208, 2, 27, 0.5)', marginBottom: '20px' }} />
        <h1 style={{ marginTop: '0', color: '#d0021b' }}>{book.title}</h1>
        <p style={{ fontWeight: 'bold', color: '#a00000', marginBottom: '5px' }}>by {book.author}</p>
        <p style={{ margin: '5px 0' }}><strong>Publisher:</strong> {book.publisher || 'N/A'}</p>
        <p style={{ margin: '5px 0' }}><strong>ID:</strong> {book.id}</p>
        <p style={{ margin: '5px 0' }}><strong>Price:</strong> ₹{book.price}</p>
        <p style={{ marginTop: '15px', fontSize: '16px', color: '#333', textAlign: 'justify' }}>
          <strong>Description:</strong> {book.description || 'No description available.'}
        </p>
        <div style={{ marginTop: '20px', fontSize: '16px', color: '#d0021b', fontWeight: 'bold' }}>
          Rating: {book.rating || 4} / 5
        </div>
        <button
          onClick={() => addToCart(book)}
          style={{
            marginTop: '25px',
            backgroundColor: '#d0021b',
            border: 'none',
            color: 'white',
            padding: '12px 30px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(208, 2, 27, 0.6)',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#a00000'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d0021b'}
        >
          Rent
        </button>
        <ReviewForm bookId={book.id} addReview={addReview} />
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};

export default BookPage;
