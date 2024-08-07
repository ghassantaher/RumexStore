import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getFeaturedProducts } from './../services/ProductsData';
import { ProductsGrid } from './ProductsGrid';
import { LoadingSpinner } from './LoadingSpinner';

import {
  gettingFeaturedProductsAction,
  gotFeaturedProductsAction,
  setSelectedCategoryAction,
} from './Store';
export const FeaturedProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const featuredProductsLoading = useSelector(
    (state) => state.products.loading,
  );
  React.useEffect(() => {
    let cancelled = false;
    const doGetFeaturedProducts = async () => {
      dispatch(gettingFeaturedProductsAction());
      dispatch(
        setSelectedCategoryAction('/', { categoryName: 'Featured Products' }),
      );
      const featuredProducts = await getFeaturedProducts();
      if (!cancelled) {
        dispatch(gotFeaturedProductsAction(featuredProducts));
      }
    };
    doGetFeaturedProducts();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {featuredProductsLoading ? (
        <LoadingSpinner />
      ) : (
        // <ProductsGrid products={products || []} />
        <React.Fragment>
          <div className="text-center container py-3">
            <h1 className="heading">
              <strong>Featured Products</strong>
            </h1>
            <ProductsGrid products={products || []} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
