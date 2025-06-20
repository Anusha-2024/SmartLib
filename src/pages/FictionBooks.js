import React from 'react';
import books from '../data/books';
import BookList from '../components/BookList';
import BookItem from '../components/BookItem';

const FictionBooks = () => {
  const fictionBooks = books.filter(book => book.genre === 'fiction');

  const booksWithComponent = fictionBooks.map(book => ({
    ...book,
    component: <BookItem book={book} />
  }));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Fiction Books</h2>
      <BookList books={booksWithComponent} />
    </div>
  );
};

export default FictionBooks;
