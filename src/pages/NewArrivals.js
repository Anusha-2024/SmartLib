import React from 'react';
import books from '../data/books';
import BookList from '../components/BookList';
import BookItem from '../components/BookItem';

const NewArrivals = () => {
  const newArrivalBooks = books.filter(book => book.genre === 'new-arrivals');

  const booksWithComponent = newArrivalBooks.map(book => ({
    ...book,
    component: <BookItem book={book} />
  }));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>New Arrivals</h2>
      <BookList books={booksWithComponent} />
    </div>
  );
};

export default NewArrivals;
