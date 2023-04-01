import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from './../services/ProductsData';
import { SalePercentage, RandomRating } from '../services/ProductsData';
import { Link } from 'react-router-dom';

import { gettingProductAction, gotProductAction } from './Store';
import { PhotoSlider } from './PhotoSlider';
import { ProductRating } from './ProductRating';
import { ColorOptions } from './ColorOptions';
import { SizeOptions } from './SizeOptions';

export const ProductDetail = () => {
  let navigate = useNavigate();
  const [showAlert, setShowAlert] = React.useState(false);
  const { productId } = useParams();
  const [selectedColor, setSelectedColor] = React.useState('');
  const [selectedSize, setSelectedSize] = React.useState('');
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
        let productColors = [];
        let productSizes = [];
        if (returnedProduct.details.productImages.length > 0) {
          images = returnedProduct.details.productImages.split(',');
        }
        if (returnedProduct.details.productColors.length > 0) {
          productColors = returnedProduct.details.productColors.split(' ');
        }
        if (returnedProduct.details.productSizes.length > 0) {
          productSizes = returnedProduct.details.productSizes.split(' ');
        }
        returnedProduct.sizeOptions = [];
        if (productSizes.length > 0) {
          returnedProduct.sizeOptions = productSizes.map((size, index) => ({
            id: index + 1,
            name: size,
          }));
        }
        returnedProduct.colorOptions = [];
        if (productColors.length > 0) {
          returnedProduct.colorOptions = productColors.map((color, index) => ({
            id: index + 1,
            color: color,
            name: color,
          }));
        }
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
    const element = document.getElementById('product-detail');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
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
    <section className="product-detail" id="product-detail">
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
            <div className="col-md-6 product-images mb-3">
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
              <div className="about mt-2">
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
                  style={{
                    maxHeight:
                      product.colorOptions?.length > 0 ? '8rem' : '15rem',
                  }}
                  dangerouslySetInnerHTML={createMarkup()}
                ></div>
              </div>
              <div className="options-section mt-2 mb-1">
                {product.colorOptions?.length > 0 && (
                  <div className="half-width px-2">
                    <h6 className="text-uppercase">
                      Color: <span>{selectedColor}</span>
                    </h6>
                    <ColorOptions
                      onChange={handleUpdateColor}
                      colorOptions={product.colorOptions}
                    ></ColorOptions>
                  </div>
                )}

                {product.sizeOptions?.length > 0 && (
                  <div className="half-width px-2">
                    <h6 className="text-uppercase">
                      Size: <span>{selectedSize}</span>
                    </h6>
                    <SizeOptions
                      onChange={handleUpdateSize}
                      sizeOptions={product.sizeOptions}
                    ></SizeOptions>
                  </div>
                )}
              </div>
              <div className="row cart-group mt-auto">
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
              <div className="d-flex align-items-center mt-auto ">
                <span className="ml-1">
                  <button
                    className="action-button dir-left py-0 px-2"
                    onClick={() => navigate(-1)}
                    style={{ fontSize: '14px' }}
                  >
                    <i className="fa fa-long-arrow-left"></i>
                    Back
                  </button>
                </span>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </section>
  );
};
