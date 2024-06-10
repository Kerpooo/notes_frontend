import { useState, useCallback, useEffect } from 'react';
import { CategoryProps } from '../components/Category';



interface UseCategoriesResult {
  categoriesList: CategoryProps[];
  error: string | null;
  loading: boolean;
}

const useCategories = (): UseCategoriesResult => {
  const [categoriesList, setCategoriesList] = useState<CategoryProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategoriesList(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categoriesList, error, loading };
};

export default useCategories;
