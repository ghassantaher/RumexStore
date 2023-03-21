import React from 'react';
import { useSelector } from 'react-redux';
import { CategoryLinks } from './CategoryLinks';
import logo from '../assets/images/store-logo.png';

export const Footer = () => {
  const categories = [...useSelector((state) => state.products.categories)];
  if (categories && categories.length > 0) {
    if (
      !Boolean(
        categories.find(
          (x) => x.categoryName === 'All Departments' && x.id === -3,
        ),
      )
    ) {
      categories.push({
        categoryName: 'All Departments',
        id: -3,
        href: '/All Departments',
      });
    }
  }
  return (
    <footer role="contentinfo">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-2">
            <h3>Categories</h3>
            <CategoryLinks
              // className="justify-content-start"
              categories={categories || []}
            />

            {/* <ul>
              <li>
                <a href="/">Shoes</a>
              </li>
              <li>
                <a href="/">Clothing</a>
              </li>
              <li>
                <a href="/">Accessories</a>
              </li>
              <li>
                <a href="/">Men</a>
              </li>
              <li>
                <a href="/">Women</a>
              </li>
              <li>
                <a href="/">Kids</a>
              </li>
              <li>
                <a href="/">Pets</a>
              </li>
            </ul> */}
          </div>
          <div className="col-md-4 col-lg-2">
            <h3>Styles</h3>
            <ul>
              <li>
                <a href="/">Athletic</a>
              </li>
              <li>
                <a href="/">Casual</a>
              </li>
              <li>
                <a href="/">Dress</a>
              </li>
              <li>
                <a href="/">Everyday</a>
              </li>
              <li>
                <a href="/">Other Days</a>
              </li>
              <li>
                <a href="/">Alternative</a>
              </li>
              <li>
                <a href="/">Otherwise</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 col-lg-2">
            <h3>Other</h3>
            <ul>
              <li>
                <a href="/">Link</a>
              </li>
              <li>
                <a href="/">Another link</a>
              </li>
              <li>
                <a href="/">Link again</a>
              </li>
              <li>
                <a href="/">Try this</a>
              </li>
              <li>
                <a href="/">Don't you dare</a>
              </li>
              <li>
                <a href="/">Oh go ahead</a>
              </li>
            </ul>
          </div>

          {/* <!-- Add the extra clearfix for only the required viewport --> */}
          {/* <div className="clearfix d-none d-md-block d-lg-none"></div> */}

          <div className="about col-xs-12 col-lg-6">
            <h3>About Us</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse euismod congue bibendum. Aliquam erat volutpat.
              Phasellus eget justo lacus. Vivamus pharetra ullamcorper massa,
              nec ultricies metus gravida egestas. Duis congue viverra arcu, ac
              aliquet turpis rutrum a. Donec semper vestibulum dapibus. Integer
              et sollicitudin metus. Vivamus at nisi turpis. Phasellus vel
              tellus id felis cursus hendrerit.
            </p>
            <p>
              <a className="btn btn-secondary btn-sm float-end" href="/">
                Learn more <span className="fa fa-arrow-circle-right"></span>
              </a>
            </p>
          </div>
        </div>
        {/* <!-- /.row --> */}
      </div>
      {/* <!-- /.container --> */}

      <div className="container social-logo">
        <ul className="social">
          <li className="social-item">
            <a href="/" className="social-link" title="Twitter Profile">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </li>
          <li className="social-item">
            <a href="/" className="social-link" title="Facebook Page">
              <i className="fa-brands fa-facebook"></i>
            </a>
          </li>
          <li className="social-item">
            <a href="/" className="social-link" title="LinkedIn Profile">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </li>
          <li className="social-item">
            <a href="/" className="social-link" title="Google Profile">
              <i className="fa-brands fa-google-plus"></i>
            </a>
          </li>
          <li className="social-item">
            <a href="/" className="social-link" title="GitHub Profile">
              <i className="fa-brands fa-github-alt"></i>
            </a>
          </li>
        </ul>

        <p>
          <a href="{{root}}index.html">
            <img src={logo} width="140" alt="Bootstrappin&#39;"></img>
          </a>
        </p>
      </div>
    </footer>
  );
};
