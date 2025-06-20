import React from 'react';
import books from '../data/books';
import BookList from '../components/BookList';
import BookItem from '../components/BookItem';

const FeaturedAuthors = () => {
  const featuredAuthorBooks = books.filter(book => book.genre === 'featured-authors');

  const booksWithComponent = featuredAuthorBooks.map(book => ({
    ...book,
    component: <BookItem book={book} />
  }));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Featured Authors</h2>
      <BookList books={booksWithComponent} />
    </div>
  );
};

export default FeaturedAuthors;
