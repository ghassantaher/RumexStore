import './scss/app.scss';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './Components/Store';

import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { Products } from './Components/Products';
import { FeaturedProductsPage } from './Components/FeaturedProductsPage';
import { ProductDetail } from './Components/ProductDetail';
import { NotFoundPage } from './Components/NotFoundPage';
import { PrivacyPolicy } from './Components/privacy-policy';

const store = configureStore();
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <div className="page container">
            <div className="badge text-wrap attention-message">
              ATTENTION: This Website is for training and demonstration purposes
              only. Check our &nbsp;
              <Link to="privacy-policy">Privacy Policy</Link>
            </div>
            <Header />
            <div className="card">
              <div className="card-body">
                <Routes>
                  <Route path="/" element={<FeaturedProductsPage />} />
                  <Route path="Privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/products/:categoryId" element={<Products />} />
                  <Route
                    path="/product/:productId"
                    element={<ProductDetail />}
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </div>
            </div>
            <Footer />
          </div>
          <footer className="border-top footer text-muted">
            <div className="container">
              &copy; 2022 - RumexStore.React -{' '}
              <Link to="privacy-policy">Privacy Policy</Link>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
