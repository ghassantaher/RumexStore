import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gettingAllCategoriesAction, gotAllCategoriesAction } from './Store';
import { getAllCategories } from '../services/ProductsData';
import { CategoryLinks } from './CategoryLinks';
import logo from '../assets/images/store-logo.png';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = [...useSelector((state) => state.products.categories)];
  const [searchParams] = useSearchParams();
  const criteria = searchParams.get('criteria') || '';
  const [search, setSearch] = React.useState(criteria);
  // const categories = Array.from(
  //   useSelector((state) => state.products.categories),
  // );
  if (categories && categories.length > 0) {
    if (
      !Boolean(
        categories.find((x) => x.categoryName === 'Featured' && x.id === -1),
      )
    ) {
      categories.unshift({
        categoryName: 'Featured',
        id: -1,
        href: '/',
        className: 'me-5',
      });
      categories.push({
        categoryName: 'Privacy Policy',
        id: -2,
        href: '/privacy-policy',
        className: 'ms-3',
      });
      categories.push({
        categoryName: 'All Departments',
        id: -3,
        href: '/All Departments',
        className: 'pull-right',
      });
    }
  }
  React.useEffect(() => {
    let cancelled = false;
    const doGetAllCategories = async () => {
      dispatch(gettingAllCategoriesAction());
      const allCategories = await getAllCategories();
      // allCategories.unshift({
      //   categoryName: 'Featured',
      //   id: -1,
      //   href: '/',
      //   className: 'me-5',
      // });
      // allCategories.push({
      //   categoryName: 'Privacy Policy',
      //   id: -2,
      //   href: '/privacy-policy',
      //   className: 'ms-3',
      // });
      // allCategories.push({
      //   categoryName: 'All Departments',
      //   id: -3,
      //   href: '/All Departments',
      //   className: 'pull-right',
      // });
      if (!cancelled) {
        dispatch(gotAllCategoriesAction(allCategories));
      }
    };
    doGetAllCategories();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.currentTarget.value);
  };
  const handleSubmit = (e) => {
    if (search.length > 2) {
      e.preventDefault();
      console.log(search);
      navigate(`search?criteria=${search}`);
      setSearch('');
    }
  };
  return (
    <header role="banner">
      <div className="container">
        <button
          className="navbar-toggler toggler d-md-none collapsed mb-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsiblecontent"
          aria-controls="collapsiblecontent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          &#9776;
        </button>
        <a className="navbar-brand" href="/">
          <img src={logo} alt="Bootstrappin'"></img>
        </a>
        <div className="utility-nav">
          <ul>
            <li>
              <a href="/">
                <i className="icon fa fa-user fa-lg"></i>
                <span>Log In or Register</span>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="icon fa fa-shopping-cart fa-lg"></i>
                <span> View Cart</span>
              </a>
            </li>
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="search-form d-flex float-end">
          <input
            className="form-control"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
          ></input>
          <button
            className="btn btn-outline-success d-none d-sm-block"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      <nav className="navbar navbar-light navbar-expand-md" role="navigation">
        <div className="container">
          <div className=" collapse navbar-collapse" id="collapsiblecontent">
            <CategoryLinks
              // className="justify-content-start"
              categories={categories || []}
              categoriesClassName="nav navbar-nav w-100"
              categoryClassName="nav-item "
              linkClassName="nav-link "
            />
          </div>
        </div>
      </nav>
    </header>
  );
};
