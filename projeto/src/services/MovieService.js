import axios from 'axios';

const searchMovies = async (query, token = null) => {
  try {
    const config = {
      headers: {},
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=403abbfe`, config);

    if (response.data.Error) {
      throw new Error(response.data.Error); // Lança erro se a API retornar uma mensagem de erro
    }

    return response.data.Search;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw new Error('Unable to fetch movie data. Please try again later.');
  }
};

export default { searchMovies };
