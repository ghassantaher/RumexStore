/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  getCategory,
  getProducts,
  RandomRating,
} from './../services/ProductsData';
import { SalePercentage, Picture } from '../services/ProductsData';
import { ProductsGrid } from './ProductsGrid';

import {
  gettingProductsAction,
  gotProductsAction,
  setSelectedCategoryAction,
} from './Store';
export const Products = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const selectedCategory = useSelector(
    (state) => state.products.selectedCategory,
  );
  const productsLoading = useSelector((state) => state.products.loading);
  React.useEffect(() => {
    let cancelled = false;
    const doGetProducts = async () => {
      dispatch(gettingProductsAction());
      const selectedCategory = await getCategory(categoryId);
      const returnedProducts = await getProducts(categoryId);
      if (!cancelled) {
        returnedProducts.forEach((element, index) => {
          returnedProducts[index].image = Picture();
          returnedProducts[index].salePercentage = SalePercentage(0.6);
          returnedProducts[index].rating = RandomRating();
        });
        returnedProducts[1].details.description = `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quaerat, rerum asperiores error omnis pariatur sequi
                      placeat quia fuga ullam. Harum obcaecati suscipit illum
                      similique excepturi voluptates quae deserunt tempore,
                      distinctio architecto ipsum dolor laboriosam inventore
                      impedit nostrum totam eaque sed est? Non rem repudiandae,
                      vitae iure suscipit pariatur, cum esse sequi cumque saepe
                      commodi reprehenderit quaerat. Quasi ipsam repellendus
                      similique`;
        dispatch(gotProductsAction(returnedProducts));
        dispatch(
          setSelectedCategoryAction(Number(categoryId), selectedCategory),
        );
      }
    };
    doGetProducts();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);
  return (
    <section>
      {productsLoading ? (
        <div>Loading featured products…</div>
      ) : (
        <React.Fragment>
          <div className="text-center container py-3">
            <h1 className="heading">
              <strong>{selectedCategory.categoryName} Products</strong>
            </h1>
            <ProductsGrid products={products || []} />
          </div>
        </React.Fragment>
      )}
    </section>
  );
};
