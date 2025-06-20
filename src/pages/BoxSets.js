import React from 'react';
import books from '../data/books';
import BookList from '../components/BookList';
import BookItem from '../components/BookItem';

const BoxSets = () => {
  const boxSetBooks = books.filter(book => book.genre === 'box-sets');

  const booksWithComponent = boxSetBooks.map(book => ({
    ...book,
    component: <BookItem book={book} />
  }));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Box Sets</h2>
      <BookList books={booksWithComponent} />
    </div>
  );
};

export default BoxSets;
