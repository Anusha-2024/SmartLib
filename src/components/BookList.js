import React from 'react';

const BookList = ({ books, title }) => {
  return (
    <div style={{ margin: '20px 0' }}>
      {title && <h2 style={{ marginBottom: '10px' }}>{title}</h2>}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        paddingRight: '10px',
        gap: '10px'
      }}>
        {books.map(book => (
          <div key={book.id} style={{}}>
            {React.cloneElement(book.component || <div />, { book })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
