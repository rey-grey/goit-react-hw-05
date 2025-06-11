import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmY4ZmE2YWQyNDMxYWY3NzFjZDdhNzVmMTI5Y2Y0OSIsIm5iZiI6MTc0OTYyNzE1Mi43MjgsInN1YiI6IjY4NDkzMTEwYzYxODZlMzI4MWRlN2Q0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IQvL-DwBFGXHHBKnUCsyX_rk8WSg5YhlC-KX4GP4k6U',
            },
          }
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching cast:', error);
      }
    };

    fetchCast();
  }, [movieId]);

  if (cast.length === 0) return <p>No cast info available.</p>;

  return (
    <ul>
      {cast.map(actor => (
        <li key={actor.cast_id}>
          <p><b>{actor.name}</b> as {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}
