import React, { useContext, useMemo } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import HorizontalBookList from '../components/HorizontalBookList';
import books from '../data/books';

const MyRented = () => {
  const { rentedBooks } = useContext(AuthContext);

  // Compute recommended books based on rented books' genres or authors
  const recommendedBooks = useMemo(() => {
    if (!rentedBooks || rentedBooks.length === 0) return [];
    const rentedGenres = new Set(rentedBooks.map(book => book.genre).filter(Boolean));
    const rentedAuthors = new Set(rentedBooks.map(book => book.author).filter(Boolean));
    // Filter books that match genre or author but are not already rented
    const filtered = books.filter(book =>
      (rentedGenres.has(book.genre) || rentedAuthors.has(book.author)) &&
      !rentedBooks.some(rented => rented.id === book.id)
    );
    return filtered.slice(0, 3);
  }, [rentedBooks]);

  if (!rentedBooks || rentedBooks.length === 0) {
    return (
      <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: 'white' }}>
        <h2>You have not rented any books yet.</h2>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '40px', padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Left side: Rented books list with fade-in animation */}
      <div style={{ flex: 1, maxWidth: '700px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', padding: '20px', backgroundColor: 'white', animation: 'fadeIn 1s ease' }}>
        <h2 style={{ marginBottom: '30px', fontWeight: 'bold', fontSize: '28px', color: '#d0021b' }}>My Rented Books</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {rentedBooks.map((book) => (
            <li key={book.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '15px', display: 'flex', gap: '15px', alignItems: 'center', animation: 'slideInLeft 0.5s ease' }}>
              <img src={book.cover} alt={book.title} style={{ width: '100px', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
              <div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#d0021b' }}>{book.title}</div>
                <div style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>by {book.author}</div>
                <div style={{ fontSize: '14px', color: '#333' }}>Duration: {book.duration || 'You can read this book once for this release.'}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side: Recommended books with slide-in animation */}
      <aside style={{ width: '350px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', padding: '20px', backgroundColor: 'white', animation: 'slideInRight 1s ease' }}>
        <HorizontalBookList title="Recommended Books Based on Your Reading" books={recommendedBooks} />
      </aside>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default MyRented;
