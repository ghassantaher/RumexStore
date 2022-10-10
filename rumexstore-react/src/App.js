import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Header } from './Components/Header';
import { Products } from './Components/Products';
import { ProductDetail } from './Components/ProductDetail';
import { CategoryLinks } from './Components/CategoryLinks';
import { NotFoundPage } from './Components/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="page container">
          <Header />
          <div className="card">
            <div className="card-body">
              <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/categoryLinks" element={<CategoryLinks />} />
                <Route path="/products/:categoryId" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </div>
        </div>
        <footer className="border-top footer text-muted">
          <div className="container">
            &copy; 2022 - RumexStore.React - <Link to="/privacy">Privacy</Link>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
