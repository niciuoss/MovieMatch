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
      params: { api_key: process.env.TMDB_API_KEY },
    });
    res.json(response.data.genres);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
