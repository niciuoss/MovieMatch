const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/categories', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
      params: { api_key: process.env.TMDB_API_KEY, language: 'pt-BR' },
    });
    res.json(response.data.genres);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.get('/api/highlights', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing`, {
      params: { api_key: process.env.TMDB_API_KEY, language: 'en-US', page: 1 },
    });
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch highlights' });
  }
});

app.get('/api/trending', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week`, {
      params: { api_key: process.env.TMDB_API_KEY },
    });
    res.json(response.data.results);
  } catch (error) {
    console.error('Failed to fetch trending movies:', error);
    res.status(500).json({ error: 'Failed to fetch trending movies' });
  }
});

router.get('/recommendations', async (req, res) => {
  const genreIds = req.query.genreIds;

  if (!genreIds) {
    return res.status(400).send('Genres parameter is required');
  }

  try {
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        api_key: 'c38a7e8f0fffa6d905b202e01ad8f27b',
        with_genres: genreIds,
      },
    });

    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).send('Error fetching recommendations');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
