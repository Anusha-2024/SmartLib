const genres = ['bestsellers', 'new-arrivals', 'award-winners', 'fiction', 'romance', 'thriller', 'action', 'religious', 'adult', 'education', 'science', 'health', 'kids-special'];

function generateDummyBooks(count) {
  const books = [];
  for (let i = 1; i <= count; i++) {
    const genre = genres[i % genres.length];
    const rating = Math.floor(Math.random() * 5) + 1; // random rating 1-5
    const dummyReviews = [
      {
        username: 'Alice',
        rating: 5,
        comment: 'Excellent book! Highly recommended.',
        date: '2023-08-01T10:00:00Z'
      },
      {
        username: 'Bob',
        rating: 4,
        comment: 'Great read, but a bit lengthy.',
        date: '2023-08-05T14:30:00Z'
      },
      {
        username: 'Charlie',
        rating: 3,
        comment: 'Average book, some good parts.',
        date: '2023-08-10T09:15:00Z'
      }
    ];
    books.push({
      id: i,
      title: `Dummy Book Title ${i}`,
      author: `Author ${i}`,
      genre: genre,
      description: `Description for Dummy Book Title ${i}`,
      synopsis: `Synopsis for Dummy Book Title ${i}`,
      price: (Math.random() * 20 + 5).toFixed(2),
      cover: `https://picsum.photos/seed/book${i}/200/300`,
      rating: rating,
      reviews: dummyReviews
    });
  }
  return books;
}

const books = generateDummyBooks(200);

export default books;
