import { Badge } from '@/components/ui/badge'
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export function Home() {
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const [selectedCategories, setSelectedCategories] = useState<Array<number>>([]);
  const [highlights, setHighlights] = useState<Array<{ id: number; title: string; poster_path: string; overview: string  }>>([]);
  const [trendingMovies, setTrendingMovies] = useState<Array<{ id: number; title: string; poster_path: string; overview: string }>>([]);
  const [recommendations, setRecommendations] = useState<Array<{ id: number; title: string; poster_path: string; overview: string; genre_ids: number[] }>>([]);
  const [genreMap, setGenreMap] = useState<{ [key: number]: string }>({});
  const [favoriteMovies, setFavoriteMovies] = useState(new Set());
  const [movieVideos, setMovieVideos] = useState<{ [key: number]: { key: string, site: string } | null }>({});

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

    const fetchGenres = async () => {
      try {
        const response = await axios.get('/api/genres');
        const genres = response.data;
        const genreMap = genres.reduce((acc: { [key: number]: string }, genre: { id: number; name: string }) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});
        setGenreMap(genreMap);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchCategories();
    fetchHighlights();
    fetchTrendingMovies();
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (selectedCategories.length === 0) {
        setRecommendations([]);
        return;
      }

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

  useEffect(() => {
    const fetchAllVideos = async () => {
      const videosMap = {};
      for (const movie of recommendations) {
        const video = await fetchMovieVideos(movie.id);
        videosMap[movie.id] = video;
      }
      setMovieVideos(videosMap);
    };

    fetchAllVideos();
  }, [recommendations]);

  const handleCategorySelect = (id: number) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((c) => c !== id)
        : [...prevSelected, id]
    );
  };

  const toggleFavorite = (movieId) => {
    setFavoriteMovies((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(movieId)) {
        newFavorites.delete(movieId);
      } else {
        newFavorites.add(movieId);
      }
      return newFavorites;
    });
  };

  const getGenreNames = (genreIds: number[]) => {
    return genreIds.map(id => genreMap[id]).filter(Boolean).join(', ');
  };

  return (
    <div className='container mx-auto px-4'>
      <Helmet title='Home' />

      <h1 className='text-3xl font-bold'>Selecione seus gêneros favoritos</h1>
      <h3 className='pb-2 text-muted-foreground text-sm'>Receba uma lista de recomendações personalizadas para você a partir dos gêneros que você selecionou.</h3>
      <div className="flex flex-wrap gap-2 pt-2">
        {categories.map((category) => (
          <Badge
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={`cursor-pointer ${selectedCategories.includes(category.id) ? 'bg-primary text-white' : 'bg-gray-300 text-black'} w-[5.4rem] h-[2.5rem] flex items-center justify-center`}
          >
            {category.name}
          </Badge>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        {recommendations.map((movie) => (
          <Card key={movie.id} className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex flex-col">
            <CardHeader className="relative">
              <div className='absolute top-2 right-2 cursor-pointer' onClick={() => toggleFavorite(movie.id)}>
              {favoriteMovies.has(movie.id) ? <FaHeart className='text-red-500' /> : <FaRegHeart className='text-gray-500' />}
              </div>             
              <CardTitle>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-auto rounded-md" />
              </CardTitle>
              <CardDescription>
                <p>{getGenreNames(movie.genre_ids)}</p>
              </CardDescription>
            </CardHeader>
            <CardContent className='flex-grow font-semibold text-xl'>
              {movie.title}
            </CardContent>
            <CardFooter className="mt-auto">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className='gap-2 w-full justify-center'>
                    Trailer ou sinopse
                    <Play />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{movie.title}</DialogTitle>
                    <DialogDescription>
                      {movie.overview}
                      {movieVideos[movie.id] ? (
                        <iframe 
                          width="100%" 
                          height="315" 
                          src={`https://www.youtube.com/embed/${movieVideos[movie.id].key}`} 
                          title="YouTube video player" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen>
                        </iframe>
                      ) : (
                        <p>Trailer não disponível</p>
                      )}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className='pt-10 lg:w-[71.45rem]'>
        <Separator />
      </div>

      <h2 className='text-2xl font-bold mt-8'>Destaques</h2>
      <div className="flex flex-wrap gap-4 mt-4">
        {highlights.map((movie) => (
          <Card key={movie.id} className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex flex-col">
            <CardHeader>
              <CardTitle>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-auto rounded-md" />
              </CardTitle>
              <CardDescription>
                <p>{getGenreNames(movie.genre_ids)}</p>
              </CardDescription>
            </CardHeader>
            <CardContent className='flex-grow font-semibold text-xl'>
              {movie.title}
            </CardContent>
            <CardFooter className="mt-auto">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className='gap-2 w-full justify-center'>
                    Trailer ou sinopse
                    <Play />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{movie.title}</DialogTitle>
                    <DialogDescription>
                      {movie.overview}
                      {movieVideos[movie.id] ? (
                        <iframe 
                          width="100%" 
                          height="315" 
                          src={`https://www.youtube.com/embed/${movieVideos[movie.id].key}`} 
                          title="YouTube video player" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen>
                        </iframe>
                      ) : (
                        <p>Trailer não disponível</p>
                      )}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className='pt-10 lg:w-[71.45rem]'>
        <Separator />
      </div>

      <h2 className='text-2xl font-bold mt-8'>Filmes em Alta</h2>
      <div className="flex flex-wrap gap-4 mt-4">
        {trendingMovies.map((movie) => (
          <Card key={movie.id} className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex flex-col">
            <CardHeader>
              <CardTitle>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-auto rounded-md" />
              </CardTitle>
              <CardDescription>
                <p>{getGenreNames(movie.genre_ids)}</p>
              </CardDescription>
            </CardHeader>
            <CardContent className='flex-grow font-semibold text-xl'>
              {movie.title}
            </CardContent>
            <CardFooter className="mt-auto">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className='gap-2 w-full justify-center'>
                    Trailer ou sinopse
                    <Play />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{movie.title}</DialogTitle>
                    <DialogDescription>
                      {movie.overview}
                      <Separator/>
                      {movieVideos[movie.id] ? (
                        <iframe 
                          width="100%" 
                          height="315" 
                          src={`https://www.youtube.com/embed/${movieVideos[movie.id].key}`} 
                          title="YouTube video player" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen>
                        </iframe>
                      ) : (
                        <p>Trailer não disponível</p>
                      )}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
