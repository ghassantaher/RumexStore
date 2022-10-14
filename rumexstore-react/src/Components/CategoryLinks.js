import React from 'react';
import { Link } from 'react-router-dom';

export const CategoryLinks = ({ categories }) => {
  const links = categories.map((category, index) => {
    return (
      <li className="nav-item" key={category.id}>
        <Link to={'/products/' + category.id} className="nav-link">
          {category.categoryName}
        </Link>
      </li>
    );
  });
  return (
    <ul className="nav nav-pills hidden-sm">
      <li className="nav-item" key="featured">
        <Link to={'/'} className="nav-link">
          Featured
        </Link>
      </li>
      {links}
      <li className="nav-item" key="privacy">
        <Link to={'/'} className="nav-link">
          Privacy
        </Link>
      </li>
    </ul>
  );
};
