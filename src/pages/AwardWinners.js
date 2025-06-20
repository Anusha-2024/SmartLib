import React from 'react';
import books from '../data/books';
import BookList from '../components/BookList';
import BookItem from '../components/BookItem';

const AwardWinners = () => {
  const awardWinnerBooks = books.filter(book => book.genre === 'award-winners');

  const booksWithComponent = awardWinnerBooks.map(book => ({
    ...book,
    component: <BookItem book={book} />
  }));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Award Winners</h2>
      <BookList books={booksWithComponent} />
    </div>
  );
};

export default AwardWinners;
