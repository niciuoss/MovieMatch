import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

export function Home() {
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const [selectedCategories, setSelectedCategories] = useState<Array<number>>([]);
  const [highlights, setHighlights] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        console.log('Categories response:', response.data); 
        
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (id: number) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((c) => c !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div>
      <Helmet title='Home' />

      <h1 className='text-3xl font-bold'>Selecione seus gêneros favoritos</h1>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={`cursor-pointer ${
              selectedCategories.includes(category.id) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            }`}
          >
            {category.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
