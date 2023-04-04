import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { searchProducts } from './../services/ProductsData';
import { ProductsGrid } from './ProductsGrid';
import { useSearchParams } from 'react-router-dom';
import { LoadingSpinner } from './LoadingSpinner';

import { searchingProductsAction, searchedProductsAction } from './Store';
export const SearchPage = () => {
  const dispatch = useDispatch();
  const searchedProducts = useSelector((state) => state.products.searched);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('criteria') || '';

  const searchedProductsLoading = useSelector(
    (state) => state.products.loadingSearch,
  );
  React.useEffect(() => {
    let cancelled = false;
    const doSearchProducts = async () => {
      dispatch(searchingProductsAction());
      const searchedProducts = await searchProducts(search);
      if (!cancelled) {
        dispatch(searchedProductsAction(searchedProducts));
      }
    };
    doSearchProducts();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  return (
    <div>
      {searchedProductsLoading ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          {searchedProducts?.length === 0 && (
            <div>
              Sorry, we couldn’t find results for{' '}
              <strong className="fs-5">"{search}"</strong>
              <br />
              Please check the spelling or try another search.
            </div>
          )}
          {searchedProducts?.length > 0 && (
            <div>
              {searchedProducts.length} items found for{' '}
              <strong className="fs-5">"{search}"</strong>
            </div>
          )}
          <ProductsGrid products={searchedProducts} />
        </React.Fragment>
      )}
    </div>
  );
};
