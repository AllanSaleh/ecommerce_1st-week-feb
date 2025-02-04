import { Product } from '../../types/types';
import './ProductCard.css';
import { productCard } from './ProductCardCSS';
import { useCart } from '../../context/CartContext';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <div style={productCard}>
      <h3>{product.title}</h3>
      <h6>{product.category}</h6>
      <p>{product.price.toFixed(2)}</p>
      <div id='product-image-div'>
        <img id='product-image' src={product.image} alt={product.title} />
      </div>
      <p>{product.description}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
