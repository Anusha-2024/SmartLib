import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const ReviewForm = ({ bookId, addReview }) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  if (!user) {
    return <p>Please log in to submit a review.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating.');
      return;
    }
    addReview({ bookId, username: user.username, rating, comment, date: new Date().toISOString() });
    setRating(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <h3>Write a Review</h3>
      <div>
        {[1,2,3,4,5].map((star) => (
          <span
            key={star}
            style={{ cursor: 'pointer', color: star <= rating ? '#f5a623' : '#ccc', fontSize: '24px' }}
            onClick={() => setRating(star)}
            role="button"
            aria-label={`${star} star`}
          >
            &#9733;
          </span>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review here"
        rows={4}
        style={{ width: '100%', marginTop: '10px', padding: '8px' }}
      />
      <button type="submit" style={{ marginTop: '10px', padding: '8px 16px', backgroundColor: '#d0021b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
