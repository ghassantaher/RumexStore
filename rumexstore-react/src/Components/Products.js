import React from 'react';
import { useParams } from 'react-router-dom';

export const Products = () => {
  const { categoryId } = useParams();
  React.useEffect(() => {
    let cancelled = false;
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      {categoryId && <h2>Products for Category Id {categoryId}</h2>}
      {!categoryId && <h2>Featured Products</h2>}
    </div>
  );
};
