import React, { useState } from 'react';
import books from '../data/books';
import BookList from '../components/BookList';
import BookItem from '../components/BookItem';

const Books = () => {
  // Extract unique genres from books data
  const uniqueGenres = Array.from(new Set(books.map(book => book.genre))).filter(Boolean);

  // Prepare genres array with 'All' option
  const genres = [{ id: 'all', name: 'All' }, ...uniqueGenres.map(genre => ({
    id: genre,
    name: genre.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }))];

  const [activeGenres, setActiveGenres] = useState(['all']);
  const [searchTerm, setSearchTerm] = useState('');

  // Toggle genre selection
  const toggleGenre = (genreId) => {
    if (genreId === 'all') {
      setActiveGenres(['all']);
    } else {
      setActiveGenres((prev) => {
        const isSelected = prev.includes(genreId);
        let newSelection;
        if (isSelected) {
          newSelection = prev.filter(g => g !== genreId);
          if (newSelection.length === 0) {
            newSelection = ['all'];
          }
        } else {
          newSelection = prev.filter(g => g !== 'all');
          newSelection.push(genreId);
        }
        return newSelection;
      });
    }
  };

  // Filter books by selected genres and search term
  const filteredBooks = books.filter(book => {
    const matchesGenre = activeGenres.includes('all') || activeGenres.includes(book.genre);
    const matchesSearch = searchTerm === '' || 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.description && book.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesGenre && matchesSearch;
  });

  // Add component property to each book for BookList rendering
  const booksWithComponent = filteredBooks.map(book => ({
    ...book,
    component: <BookItem book={book} />
  }));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by Title, Author, or Description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px',
            width: '100%',
            maxWidth: '400px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      {/* Genre Filters */}
      <nav style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {genres.map(genre => (
          <button
            key={genre.id}
            onClick={() => toggleGenre(genre.id)}
            style={{
              padding: '8px 16px',
              backgroundColor: activeGenres.includes(genre.id) ? '#d0021b' : '#f5f5f5',
              color: activeGenres.includes(genre.id) ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {genre.name}
          </button>
        ))}
      </nav>

      {/* Book List */}
      <main>
        {booksWithComponent.length > 0 ? (
          <BookList books={booksWithComponent} />
        ) : (
          <p style={{ fontSize: '16px', color: '#555' }}>No books found.</p>
        )}
      </main>
    </div>
  );
};

export default Books;
