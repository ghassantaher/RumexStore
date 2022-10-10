import React from 'react';

export const Header = () => {
  React.useEffect(() => {
    let cancelled = false;
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header className="navbar navbar-expand-sm navbar-light bg-primary navbar-static-top">
      <div className="container">
        <ul className="nav navbar-nav ml-auto">
          <li>
            <nav className="card-header d-none d-sm-block">
              <div className="spy-logo">
                <h2>Header </h2>
              </div>
            </nav>
          </li>
          <li className="nav-item navbar-text"></li>
          <ul className="dropdown-menu">
            <li className="nav-item">
              <a className="nav-link">Privacy</a>
            </li>
          </ul>
        </ul>
      </div>
    </header>
  );
};
