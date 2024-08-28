import { useState } from 'react';
import { Container, Title, Input, Button, MoviesContainer, MovieCard } from '../styles/MovieSearchEngine';
import MovieService from '../services/MovieService';

const MovieSearchEngine = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const searchMovies = async () => {
    try {
      setError(null);
      const token = localStorage.getItem('token');
      const results = await MovieService.searchMovies(query, token);
      setMovies(results);
    } catch (error) {
      setError('Failed to fetch movie data. Please try again.');
      console.error('Error fetching movie data:', error);
    }
  };

  return (
    <Container>
      <Title>Movie Search Engine</Title>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie"
      />
      <Button onClick={searchMovies}>Search</Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MoviesContainer>
        {movies && movies.map((movie) => (
          <MovieCard key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} Poster`} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </MovieCard>
        ))}
      </MoviesContainer>
    </Container>
  );
};

export default MovieSearchEngine;
