import React from 'react';
import { Link } from 'react-router-dom';

export const ProductList = ({ products }) => {
  const productList = products.map((product) => {
    // const imageUrl = '/images/' + product.details.productImage;
    const imageUrl =
      'https://via.placeholder.com/250x150/edded8/270f61?text=' +
      product.details.modelName;
    // const isCurrentCategory = categoryId === product.categoryId;
    return (
      <div key={product.id.toString()} className="col-xs-6 col-sm-4 col-md-3">
        <div className="product">
          {/* <img src={imageUrl} /> */}
          <img
            src={imageUrl}
            alt={product.details.modelName}
            className="img-thumbnail"
          />
          <div className="price">${product.currentPrice.toFixed(2)}</div>
          <div className="title-container">
            <h5>{product.details.modelName}</h5>
          </div>
          <div className="model-number">
            <span className="text-muted">Model Number:</span>{' '}
            {product.details.modelNumber}
          </div>
          <Link
            to={'/product/' + product.id}
            className="btn btn-primary btn-cart"
          >
            <span className="glyphicon glyphicon-shopping-cart" /> Add to Cart
          </Link>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="row">{productList}</div>
    </div>
  );
};
