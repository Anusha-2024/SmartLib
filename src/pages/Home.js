import React from 'react';
import books from '../data/books';
import HorizontalBookList from '../components/HorizontalBookList';

const Home = () => {
  // Filter books by genre for each section and limit to 5 books
  const trendingBooks = books.slice(0, 12);
  const newArrivals = books.filter(book => book.genre === 'new-arrivals').slice(0, 12);
  const kidsSpecial = books.filter(book => book.genre && book.genre.toLowerCase() === 'kids-special').slice(0, 12);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <HorizontalBookList title="Trending Books" books={trendingBooks} />
      <HorizontalBookList title="New Arrivals" books={newArrivals} />
      <HorizontalBookList title="Kids Special" books={kidsSpecial} />

      <section style={{ marginTop: '40px' }}>
        <h2 style={{ color: '#d0021b', marginBottom: '20px' }}>Testimonials</h2>
        <div style={{ display: 'flex', gap: '20px', overflowX: 'auto' }}>
          <div style={{ minWidth: '300px', border: '1px solid #d0021b', borderRadius: '8px', padding: '20px', backgroundColor: 'white' }}>
            <p>"SmartLib has been a great resource for me over the years. The collection is vast and the interface is user-friendly."</p>
            <p style={{ fontWeight: 'bold', marginTop: '10px' }}>- Bhavika Sharma</p>
          </div>
          <div style={{ minWidth: '300px', border: '1px solid #d0021b', borderRadius: '8px', padding: '20px', backgroundColor: 'white' }}>
            <p>"I love how easy it is to find books on SmartLib. The recommendations are spot on!"</p>
            <p style={{ fontWeight: 'bold', marginTop: '10px' }}>- Smita Gupta</p>
          </div>
          <div style={{ minWidth: '300px', border: '1px solid #d0021b', borderRadius: '8px', padding: '20px', backgroundColor: 'white' }}>
            <p>"A fantastic platform for book lovers. Highly recommend to everyone."</p>
            <p style={{ fontWeight: 'bold', marginTop: '10px' }}>- Rahul Raj</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
