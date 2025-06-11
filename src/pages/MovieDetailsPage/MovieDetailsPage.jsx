import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import axios from 'axios';


export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmY4ZmE2YWQyNDMxYWY3NzFjZDdhNzVmMTI5Y2Y0OSIsIm5iZiI6MTc0OTYyNzE1Mi43MjgsInN1YiI6IjY4NDkzMTEwYzYxODZlMzI4MWRlN2Q0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IQvL-DwBFGXHHBKnUCsyX_rk8WSg5YhlC-KX4GP4k6U',
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    // чек попередню лок!!!!!
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
    
      navigate('/movies');
    }
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={handleGoBack}>Go back</button>
      <h1>{movie.title}</h1>
      <img
        src={
          movie.poster_path
            ? `${BASE_IMG_URL}${movie.poster_path}`
            : 'https://via.placeholder.com/300x450?text=No+Image'
        }
        alt={movie.title}
        style={{ width: '300px', borderRadius: '8px' }}
      />
      <p>User score: {Math.round(movie.vote_average * 10)}%</p>
      <p>Overview: {movie.overview}</p>
      <p>Genres: {movie.genres.map(g => g.name).join(', ')}</p>

      <hr />
      <h3>Additional information</h3>
      <ul>
  <li>
    <Link to={`/movies/${movieId}/cast`} state={{ from: location.state?.from ?? '/' }}>Cast</Link>
  </li>
  <li>
    <Link to={`/movies/${movieId}/reviews`} state={{ from: location.state?.from ?? '/' }}>Reviews</Link>
  </li>
</ul>
      <hr />

      <Outlet />
    </div>
  );
}
