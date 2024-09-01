import { useState } from 'react';
import axios from 'axios';
import { Container, Title, Input, Button, MoviesContainer, MovieCard } from '../styles/MovieSearchEngine';


const MovieSearchEngine = () => {
  const [query, setQuery] = useState(''); // Define o estado para a consulta de busca
  const [movies, setMovies] = useState([]); // Define o estado para armazenar os filmes

 
  const searchMovies = async () => {  // Função para buscar filmes

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=6c424f783d6bd4db06274a9d062faddd&query=${query}`);
      let results = response.data.results.filter(movie => movie.poster_path);
      setMovies(results); 
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
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
      <MoviesContainer>
        {movies && movies.map((movie) => ( // Verifica se há filmes e os mapeia para exibir MovieCard
          <MovieCard key={movie.imdbID}>
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={`${movie.title} Poster`} /> 
            <h3>{movie.title}</h3> 
            <p>{movie.release_date.slice(0, 4)}</p> 
          </MovieCard>
        ))}
      </MoviesContainer>
    </Container>
  );
};
