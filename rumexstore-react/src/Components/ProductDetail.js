import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from './../services/ProductsData';
import { SalePercentage, RandomRating } from '../services/ProductsData';
import { Link } from 'react-router-dom';

import { gettingProductAction, gotProductAction } from './Store';
import { PhotoSlider } from './PhotoSlider';
import { ProductRating } from './ProductRating';
import { ColorOptions } from './ColorOptions';
import { SizeOptions } from './SizeOptions';

export const ProductDetail = () => {
  const [showAlert, setShowAlert] = React.useState(false);
  const { productId } = useParams();
  const [selectedColor, setSelectedColor] = React.useState('purple');
  const [selectedSize, setSelectedSize] = React.useState('10');
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.viewing);
  const [quantity, setQuantity] = React.useState(1);
  React.useEffect(() => {
    let cancelled = false;
    const doGetProduct = async () => {
      dispatch(gettingProductAction());
      const returnedProduct = await getProduct(productId);
      if (!cancelled) {
        let images = [];
        if (returnedProduct.details.productImageLarge.length > 0) {
          images = returnedProduct.details.productImageLarge.split(',');
        }
        returnedProduct.sizeOptions = [
          {
            id: 0,
            name: '8',
          },
          {
            id: 1,
            name: '9',
          },
          {
            id: 2,
            name: '10',
          },
          {
            id: 3,
            name: '11',
          },
          {
            id: 5,
            name: 'S',
          },
          {
            id: 6,
            name: 'M',
          },
          {
            id: 7,
            name: 'L',
          },
          {
            id: 8,
            name: 'XL',
          },
          {
            id: 9,
            name: 'XLL',
          },
        ];
        returnedProduct.colorOptions = [
          {
            id: 0,
            color: 'purple',
            name: 'purple',
          },
          {
            id: 1,
            url: 'https://assets.codepen.io/1462889/mat1.jpg',
            name: 'color-1',
          },
          {
            id: 2,
            url: 'https://assets.codepen.io/1462889/mat2.jpg',
            name: 'color-2',
          },
          {
            id: 3,
            url: 'https://assets.codepen.io/1462889/mat3.jpg',
            name: 'color-3',
          },
          {
            id: 4,
            url: 'https://assets.codepen.io/1462889/mat4.jpg',
            name: 'color-4',
          },
          {
            id: 5,
            url: 'https://assets.codepen.io/1462889/mat5.jpg',
            name: 'color-5',
          },

          {
            id: 7,
            color: 'red',
            name: 'red',
          },
        ];
        returnedProduct.salePercentage = SalePercentage(0.6);
        returnedProduct.rating = RandomRating();
        returnedProduct.slideImages = [];
        if (images.length > 0) {
          returnedProduct.slideImages = images.map((image, index) => ({
            id: index + 1,
            url: image,
            caption: 'Slide ' + index + 1,
          }));
        }
        if (returnedProduct.details.productImage.length > 0) {
          returnedProduct.slideImages.unshift({
            id: 0,
            url: returnedProduct.details.productImage,
            caption: 'Slide 0',
          });
        }
        dispatch(gotProductAction(returnedProduct));
      }
    };
    doGetProduct();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);
  const handleUpdateQuantity = (e) => {
    setQuantity(e.currentTarget.value);
  };
  const handleUpdateColor = (e) => {
    setSelectedColor(e.currentTarget.value);
  };
  const handleUpdateSize = (e) => {
    setSelectedSize(e.currentTarget.value);
  };
  const addToCart = (value) => {
    setShowAlert(value);
  };
  function createMarkup() {
    return {
      __html: product.details.description,
    };
  }
  return (
    <section className="product-detail">
      {product == null ? (
        <div>Loading Product…</div>
      ) : (
        <React.Fragment>
          {showAlert && (
            <div
              className="alert alert-info alert-dismissible fade show"
              role="alert"
            >
              <h4 className="alert-heading">Not Implemented!</h4>
              <p>This feature is not implemented yet</p>
              <hr />
              <p className="mb-0">Fell free to contact us at.</p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => {
                  addToCart(false);
                }}
              ></button>
            </div>
          )}
          <div className="row product-details-container">
            <div className="col-md-6 product-images">
              <PhotoSlider
                photos={product.slideImages || []}
                width={'calc(18.4vh)'}
                height={'calc(12vh)'}
              />
            </div>
            <div className="col-md-6 product-info">
              <h1 className="hidden-xs">{product.details.modelName}</h1>
              {product?.rating?.average > 0.0 && product?.rating?.count > 0 && (
                <div className="float-end mt-2 me-2">
                  <ProductRating
                    average={product?.rating?.average}
                    count={product?.rating?.count}
                  ></ProductRating>
                </div>
              )}
              <div className="price-group p-0 mt-2">
                <p className="new-price text-bold">
                  $
                  {(
                    product.currentPrice -
                    ((product.currentPrice * product.salePercentage) | 0) / 100
                  ).toFixed(2)}
                </p>
                {product.salePercentage > 0 && (
                  <p className="old-price">
                    <del>${product.currentPrice.toFixed(2)}</del>
                    <span className="old-price-discount text-danger">
                      &nbsp;{`(${product.salePercentage}% Off)`}
                    </span>
                  </p>
                )}
                <div style={{ clear: 'left' }}>
                  <p className="text-secondary m-0 p-0 lh-1">
                    (Additional tax may apply on checkout)
                  </p>
                </div>
              </div>
              <div className="about mt-3">
                <p>
                  Availability :<span>In stock</span>
                </p>
                <p>
                  Model Number:<span>{product.details.modelNumber}</span>
                </p>
                <p>
                  Categories :
                  <span>
                    <Link to={'/products/' + product.categoryId}>
                      {product.categoryName},&nbsp;
                    </Link>
                  </span>
                </p>
                <p>
                  Tags :<span></span>
                  <span>Fashion, Hood, Classic</span>
                </p>
              </div>
              <div className="descriptionContainer mt-3">
                <div className="box">
                  <hr className="hr-1" />
                  <div className="container">
                    <div>
                      <p>Description</p>
                    </div>
                  </div>
                  <hr className="hr-2" />
                </div>
                <div
                  className="description"
                  dangerouslySetInnerHTML={createMarkup()}
                ></div>
              </div>
              <div className="options-section mt-3">
                <div className="half-width px-2">
                  <h6 className="text-uppercase">
                    Color: <span>{selectedColor}</span>
                  </h6>
                  <ColorOptions
                    onChange={handleUpdateColor}
                    colorOptions={product.colorOptions}
                  ></ColorOptions>
                </div>
                <div className="half-width px-2">
                  <h6 className="text-uppercase">
                    Size: <span>{selectedSize}</span>
                  </h6>
                  <SizeOptions
                    onChange={handleUpdateSize}
                    sizeOptions={product.sizeOptions}
                  ></SizeOptions>
                </div>
              </div>
              <div className="row cart-group">
                <label htmlFor="qty">Quantity:</label>
                <input
                  type="number"
                  name="qty"
                  id="qty"
                  value={quantity}
                  onChange={handleUpdateQuantity}
                  className="cart-quantity form-control"
                />
                <button
                  type="button"
                  className="btn btn-primary cart-button"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Not Implemented"
                  disabled
                  onClick={() => {
                    addToCart(true);
                  }}
                >
                  <i className="icon fa fa-shopping-cart fa-sm me-2"></i>
                  Add to Cart
                </button>
              </div>
              <div className="d-flex align-items-center">
                <i className="fa fa-long-arrow-left"></i>
                <span className="ml-1">
                  <Link to="/">Back to List</Link>
                </span>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </section>
  );
};
