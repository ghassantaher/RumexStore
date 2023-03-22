import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { searchProducts } from './../services/ProductsData';
import { ProductList } from './ProductList';
import { useSearchParams } from 'react-router-dom';

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
        <div>Searching for '{search}'</div>
      ) : (
        <ProductList products={searchedProducts || []} />
      )}
    </div>
  );
};
