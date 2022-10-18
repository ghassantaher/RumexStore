import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getProducts } from './../services/ProductsData';
import { ProductList } from './ProductList';

import { gettingProductsAction, gotProductsAction } from './Store';
export const Products = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productsLoading = useSelector((state) => state.products.loading);
  React.useEffect(() => {
    let cancelled = false;
    const doGetProducts = async () => {
      dispatch(gettingProductsAction());
      const returnedProducts = await getProducts(categoryId);
      if (!cancelled) {
        dispatch(gotProductsAction(returnedProducts));
      }
    };
    doGetProducts();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);
  return (
    <div>
      {productsLoading ? (
        <div>Loading featured products…</div>
      ) : (
        <ProductList products={products || []} />
      )}
    </div>
  );
};
