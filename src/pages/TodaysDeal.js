import React from 'react';
import books from '../data/books';
import BookItem from '../components/BookItem';

const TodaysDeal = () => {
  // Filter books with a dummy discount condition, e.g., price less than 15
  // Add a discount property for demonstration
  let discountedBooks = books
    .filter(book => parseFloat(book.price) < 15)
    .map(book => ({
      ...book,
      discount: Math.floor(Math.random() * 26) + 5 // random discount between 5% and 30%
    }));

  // Randomly select between 10 to 25 books from discountedBooks
  const minBooks = 10;
  const maxBooks = 25;
  const count = Math.floor(Math.random() * (maxBooks - minBooks + 1)) + minBooks;

  // Shuffle the array and slice to count
  discountedBooks = discountedBooks
    .sort(() => 0.5 - Math.random())
    .slice(0, count);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Today's Deal - Discounted Books</h1>
      {discountedBooks.length > 0 ? (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {discountedBooks.map(book => (
            <BookItem key={book.id} book={book} discount={book.discount} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '18px', color: '#555' }}>
          <p>Sorry, there are currently no deals available.</p>
          <p>Please check back later for exciting discounts!</p>
        </div>
      )}
    </div>
  );
};

export default TodaysDeal;
