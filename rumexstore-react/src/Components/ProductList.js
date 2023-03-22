import React from 'react';
import { Link } from 'react-router-dom';
import { ProductRating } from './ProductRating';
import { RandomLabel, MainLabel } from '../services/ProductsData';

export const ProductList = ({ products }) => {
  const productList = products.map((product) => {
    let mainLabel = '';
    if (!product?.salePercentage) {
      mainLabel = MainLabel(0.6);
    }
    let randomLabel = RandomLabel(0.65);
    return (
      <div key={product.id.toString()} className="col-xs-12 col-sm-6 col-md-4">
        <div className="card h-100">
          <div className="img-container">
            <div className="img-wrap">
              {/* <div
                className="badge bg-dark text-white position-absolute circle"
                style={{ left: '-10px', top: '-20px' }}
              >
                New
              </div> */}
              {/* <div className="badge bg-warning text-white position-absolute top-0 end-0 sharp-corner mt-3 px-3 py-2">
                New
              </div> */}
              {/* <div
                className="badge text-white position-absolute top-0 start-0 sharp-corner vertical uppercase px-2 py-3"
                style={{ backgroundColor: 'rgba(166, 20, 88, 0.8)' }}
              >
                Sale
              </div> */}
              <div className="ribbons">
                {product.image && mainLabel && (
                  <div className={`diagonal top-right ${mainLabel?.color}`}>
                    <span className="top-right">{mainLabel?.label}</span>
                  </div>
                )}
              </div>
              {product.image && (
                <img src={product.image} className="img-fluid" alt="..."></img>
              )}
              {product.image && (
                <div className="desc multi-lines">
                  {product.details.description}
                </div>
              )}

              {product.image && product.salePercentage > 0 && (
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
                {product.image && (
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

            {!product.image && (
              <div className="multi-lines my-2">
                {product.details.description}
              </div>
            )}
            <div className="options-section mt-auto mb-2">
              <h6 className="colors-section float-start me-2">Colors:</h6>
              <div className="preview">
                <input className="red" name="color" type="radio" />
                <input className="green" name="color" type="radio" />
                <input
                  defaultChecked
                  className="yellow"
                  name="color"
                  type="radio"
                />
                <input className="purple" name="color" type="radio" />
                <input className="orange" name="color" type="radio" />
                <input className="pink" name="color" type="radio" />
                <input className="brown" name="color" type="radio" />
                <input className="gray" name="color" type="radio" />
              </div>
            </div>
            <div className="btn-container">
              <div className="btn">Add to Cart</div>
              <Link to={'/product/' + product.id} className="btn">
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
    <div className="container-fluid mt-3 mb-3 product-list">
      <div className="row g-2">{productList}</div>
    </div>
  );
};
