import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { gettingAllCategoriesAction, gotAllCategoriesAction } from './Store';
import { getAllCategories } from './../services/ProductsData';
import { CategoryLinks } from './CategoryLinks';

export const Header = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories);
  const allCategoriesLoading = useSelector((state) => state.products.loading);
  React.useEffect(() => {
    let cancelled = false;
    const doGetAllCategories = async () => {
      dispatch(gettingAllCategoriesAction());
      const allCategories = await getAllCategories();
      if (!cancelled) {
        dispatch(gotAllCategoriesAction(allCategories));
      }
    };
    doGetAllCategories();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="navbar navbar-expand-sm navbar-light bg-primary navbar-static-top">
      <div className="container">
        <ul className="nav navbar-nav ml-auto">
          <li>
            <nav className="card-header d-none d-sm-block">
              <div className="spy-logo">
                <Link to="/">
                  <img
                    className="rounded-circle"
                    src="./images/store-logo.png"
                    alt="Rumex Store"
                    w-75
                  />
                </Link>
              </div>
            </nav>
          </li>
          <li className="nav-item navbar-text">
            {allCategoriesLoading ? (
              <div>Loading categories…</div>
            ) : (
              <CategoryLinks categories={categories || []} />
            )}
          </li>
          <li className="nav-item navbar-text"></li>
          <ul className="dropdown-menu">
            <li className="nav-item">
              <a href="/privacy" className="nav-link">
                Privacy
              </a>
            </li>
          </ul>
        </ul>
      </div>
    </header>
  );
};
