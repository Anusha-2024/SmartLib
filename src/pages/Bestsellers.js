import React from 'react';
import books from '../data/books';
import BookList from '../components/BookList';
import BookItem from '../components/BookItem';

const Bestsellers = () => {
  const bestsellerBooks = books.filter(book => book.genre === 'bestsellers');

  const booksWithComponent = bestsellerBooks.map(book => ({
    ...book,
    component: <BookItem book={book} />
  }));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Bestsellers</h2>
      <BookList books={booksWithComponent} />
    </div>
  );
};

export default Bestsellers;
