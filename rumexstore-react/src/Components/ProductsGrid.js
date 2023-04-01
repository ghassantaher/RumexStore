import React from 'react';
import { Link } from 'react-router-dom';
import { ProductRating } from './ProductRating';
import { RandomLabel, MainLabel } from '../services/ProductsData';

export const ProductsGrid = ({ products }) => {
  const productsGrid = products.map((product) => {
    let mainLabel = '';
    let colors = [];
    if (product.details.productColors.length > 0) {
      colors = product.details.productColors.split(' ');
    }

    if (!product?.salePercentage) {
      mainLabel = MainLabel(0.6);
    }
    let randomLabel = RandomLabel(0.65);
    function createMarkup() {
      return {
        __html: product.details.description,
      };
    }
    return (
      <div key={product.id.toString()} className="col-xs-12 col-sm-6 col-md-4">
        <div className="card h-100">
          <div className="img-container">
            <div className="img-wrap">
              <div className="ribbons">
                {product.details.productImage && mainLabel && (
                  <div className={`diagonal top-right ${mainLabel?.color}`}>
                    <span className="top-right">{mainLabel?.label}</span>
                  </div>
                )}
              </div>
              {product.details.productImage && (
                <img
                  src={`../images/product${product.details.productImage}`}
                  className="img-fluid"
                  alt="..."
                  onError={(event) => {
                    event.target.src = '../images/product-image.png';
                    event.onerror = null;
                  }}
                ></img>
              )}
              {product.details.productImage && (
                <div
                  className="desc multi-lines"
                  dangerouslySetInnerHTML={createMarkup()}
                ></div>
              )}

              {product.details.productImage && product.salePercentage > 0 && (
                <div className="offer-content">
                  <div className="ribbon5 red">{`-${product.salePercentage}%`}</div>
                </div>
              )}
              {product.unitsInStock === 1 && (
                <div>
                  <div className="ribbons">
                    <div className="note black middle-full">Out of stock</div>
                  </div>
                </div>
              )}
              <div className="ribbons">
                {product.details.productImage && (
                  <div
                    className={`note ${randomLabel.color} top-left-2 small-rounded`}
                  >
                    {randomLabel.label}
                  </div>
                )}
              </div>

              <ul className="d-flex align-items-center justify-content-center list-unstyled icons">
                <li className="icon">
                  <span className="fas fa-expand-arrows-alt"></span>
                </li>
                <li className="icon mx-3">
                  <span className="far fa-heart"></span>
                </li>
                <li className="icon">
                  <span className="fas fa-shopping-bag"></span>
                </li>
              </ul>
            </div>
          </div>
          <div className="product-detail-container card-body d-flex flex-column p-1">
            <div className="content justify-content-between align-items-center">
              <div
                key={product.id.toString()}
                className="btn btn-right-side"
                id="price"
              >
                $
                {(
                  product.currentPrice -
                  ((product.currentPrice * product.salePercentage) | 0) / 100
                ).toFixed(2)}
                {product.salePercentage > 0 && (
                  <h5 className="discounted">
                    ${product.currentPrice.toFixed(2)}
                  </h5>
                )}
              </div>
              <h2>{product.details.modelName}</h2>
              <div className="clearfix">
                {product.unitsInStock > 1 && product.unitsInStock < 5 && (
                  <div className="badge bg-pink text-red float-start ms-0">
                    Only {product.unitsInStock} left
                  </div>
                )}
              </div>
              {product?.rating?.average > 0.0 && product?.rating?.count > 0 && (
                <div className="float-start mt-0 me-3">
                  <ProductRating
                    average={product?.rating?.average}
                    count={product?.rating?.count}
                  ></ProductRating>
                </div>
              )}
            </div>

            {!product.details.productImage && (
              <div
                className="multi-lines my-2"
                dangerouslySetInnerHTML={createMarkup()}
              ></div>
            )}
            {colors?.length > 0 && (
              <div className="options-section mt-auto mb-2">
                <h6 className="colors-section float-start me-2">Colors:</h6>
                <div className="preview">
                  {colors?.map((color, index) => (
                    <input
                      key={index + 1}
                      className={color.toLowerCase()}
                      name={color.toLowerCase()}
                      type="radio"
                    />
                  ))}
                </div>
              </div>
            )}
            <div className="btn-container mt-auto">
              <button
                type="button"
                className="action-button dir-right"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Not Implemented"
                disabled
              >
                <i className="icon fa fa-shopping-cart fa-sm me-2"></i>
                Add to Cart
              </button>
              <Link
                to={'/product/' + product.id}
                className="action-button  dir-right"
              >
                <span className="glyphicon glyphicon-shopping-cart" />
                Details <i className="fa fa-arrow-circle-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="container-fluid mt-3 mb-3 products-grid">
      <div className="row g-2">{productsGrid}</div>
    </div>
  );
};
