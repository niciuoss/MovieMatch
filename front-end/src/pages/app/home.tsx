import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function Home() {
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const [selectedCategories, setSelectedCategories] = useState<Array<number>>([]);
  const [highlights, setHighlights] = useState<Array<{ id: number; title: string; poster_path: string }>>([]);
  const [trendingMovies, setTrendingMovies] = useState<Array<{ id: number; title: string; poster_path: string }>>([]);
  const [recommendations, setRecommendations] = useState<Array<{ id: number; title: string; poster_path: string }>>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories'); 
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchHighlights = async () => {
      try {
        const response = await axios.get('/api/highlights'); 
        setHighlights(response.data);
      } catch (error) {
        console.error('Error fetching highlights:', error);
      }
    };

    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get('/api/trending'); 
        setTrendingMovies(response.data);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchCategories();
    fetchHighlights();
    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    if (selectedCategories.length === 0) return;

    const fetchRecommendations = async () => {
      try {
        const response = await axios.get('/api/recommendations', {
          params: { genreIds: selectedCategories.join(',') },
        });
        if (Array.isArray(response.data)) {
          setRecommendations(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [selectedCategories]);

  const handleCategorySelect = (id: number) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((c) => c !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div className='container mx-auto px-4'>
      <Helmet title='Home' />

      <h1 className='text-3xl font-bold pb-2'>Selecione seus gêneros favoritos</h1>
      <div className="flex flex-wrap gap-2 pt-2">
        {categories.map((category) => (
          <Badge
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={`cursor-pointer ${
              selectedCategories.includes(category.id) ? 'bg-primary text-white' : 'bg-gray-300 text-black'
            } w-[5.4rem] h-[2.5rem] flex items-center justify-center`}
          >
            {category.name}
          </Badge>
        ))}
      </div>

      <h2 className='text-2xl font-bold mt-8'>Destaques</h2>
      <div className="flex flex-wrap gap-4 mt-4">
        {highlights.map((movie) => (
          <Card key={movie.id} className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
            <CardHeader>
              <CardTitle>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-auto" />
              </CardTitle>
              <CardDescription>{movie.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{movie.genre_ids}</p>
            </CardContent>
            <CardFooter>
              <p>Trailer ou outros detalhes</p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <h2 className='text-2xl font-bold mt-8'>Filmes em Alta</h2>
      <div className="flex flex-wrap gap-4 mt-4">
        {trendingMovies.map((movie) => (
          <div key={movie.id} className="w-48">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-auto" />
            <p className="mt-2 text-center">{movie.title}</p>
          </div>
        ))}
      </div>

      <h2 className='text-2xl font-bold mt-8'>Recomendações Personalizadas</h2>
      <div className="flex flex-wrap gap-4 mt-4">
        {recommendations.map((movie) => (
          <div key={movie.id} className="w-48">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-auto" />
            <p className="mt-2 text-center">{movie.title}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
