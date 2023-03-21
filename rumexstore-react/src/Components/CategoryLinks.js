import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Active } from '../services/ProductsData';

export const CategoryLinks = ({
  categories,
  categoriesClassName = '',
  categoryClassName = '',
  linkClassName = '',
}) => {
  const selectedCategoryId = useSelector(
    (state) => state.products.selectedCategoryId,
  );
  const links = categories.map((category, index) => {
    return (
      <li
        className={categoryClassName + (category.className || '')}
        key={category.id}
      >
        {typeof (category.id === 'number') && category.id > 0 ? (
          <Link
            to={'/products/' + category.id}
            className={linkClassName + Active(selectedCategoryId, category.id)}
          >
            {category.categoryName}
          </Link>
        ) : (
          <Link
            to={category.href}
            className={
              linkClassName + Active(selectedCategoryId, category.href)
            }
          >
            {category.categoryName}
          </Link>
        )}
      </li>
    );
  });
  return <ul className={categoriesClassName || ''}>{links}</ul>;
};
