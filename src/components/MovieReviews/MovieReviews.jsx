import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmY4ZmE2YWQyNDMxYWY3NzFjZDdhNzVmMTI5Y2Y0OSIsIm5iZiI6MTc0OTYyNzE1Mi43MjgsInN1YiI6IjY4NDkzMTEwYzYxODZlMzI4MWRlN2Q0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IQvL-DwBFGXHHBKnUCsyX_rk8WSg5YhlC-KX4GP4k6U',            },
          }
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <ul>
      {reviews.map(review => (
        <li key={review.id}>
          <p><b>{review.author}</b> says:</p>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
