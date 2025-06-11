import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList.jsx';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/trending/movie/day',
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmY4ZmE2YWQyNDMxYWY3NzFjZDdhNzVmMTI5Y2Y0OSIsIm5iZiI6MTc0OTYyNzE1Mi43MjgsInN1YiI6IjY4NDkzMTEwYzYxODZlMzI4MWRlN2Q0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IQvL-DwBFGXHHBKnUCsyX_rk8WSg5YhlC-KX4GP4k6U',
            },
          }
        );
        setMovies(response.data.results);
      } catch (err) {
        setError('Oops! Something went wrong.');
      }
    }

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending Today</h1>
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
