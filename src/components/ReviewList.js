import React from 'react';

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews yet.</p>;
  }

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Reviews (Average Rating: {averageRating} / 5)</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {reviews.map((review, index) => (
          <li key={index} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
            <div style={{ fontWeight: 'bold' }}>{review.username} - {new Date(review.date).toLocaleDateString()}</div>
            <div>
              {[1,2,3,4,5].map((star) => (
                <span key={star} style={{ color: star <= review.rating ? '#f5a623' : '#ccc' }}>&#9733;</span>
              ))}
            </div>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
