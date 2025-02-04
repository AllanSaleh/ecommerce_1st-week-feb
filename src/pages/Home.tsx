import { Product } from '../types/types';
import ProductCard from '../components/ProductCard/ProductCard';
import { useProductContext } from '../context/ProductContext';
import { useQuery } from 'react-query';
import { fetchCategories, fetchProducts } from '../api/api';
import { useEffect } from 'react';

const Home = () => {
  const { products, selectedCategory, dispatch } = useProductContext();

  const {
    data: productsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (productsData) {
      dispatch({ type: 'SET_PRODUCTS', payload: productsData.data });
    }
  }, [productsData, dispatch]);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const getFilteredProducts = () => {
    if (selectedCategory) {
      return products?.filter(
        (product: Product) => product.category === selectedCategory
      );
    }
    return products;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div>
      <select
        onChange={(e) =>
          dispatch({ type: 'SET_SELECTED_CATEGORY', payload: e.target.value })
        }
      >
        <option value=''>All Categories</option>
        {categories?.data.map((category: string) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        {isLoading && <h1>Loading...</h1>}
        {filteredProducts?.map((product: Product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
