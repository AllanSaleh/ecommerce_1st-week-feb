import React, { createContext, useContext, ReactNode, useReducer } from 'react';
import { Product } from '../types/types';

// Define action types
type ProductAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string };

// Define the shape of the state
interface ProductState {
  products: Product[];
  selectedCategory: string;
}

// Initial state
const initialState: ProductState = {
  products: [],
  selectedCategory: '',
};

// Reducer function
// The reducer listens for actions. It changes the state based on the action type and returns the updated state
const productReducer = (
  state: ProductState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Create context
interface ProductContextType extends ProductState {
  dispatch: React.Dispatch<ProductAction>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider component
interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  // useReducer(productReducer, initialState) is used to manage the state using the productReducer and the initialState. This hook returns the current state and a dispatch function.
  // The dispatch function allows us to trigger actions like SET_PRODUCTS and SET_SELECTED_CATEGORY
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook for accessing the context
export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
