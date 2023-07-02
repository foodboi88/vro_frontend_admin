import './App.css';
import './App.styles.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes'
import OutLoginLayout from './layouts/out-login/out-login';
import Home from './layouts/home/home';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
          </Route>
          <Route element={<Home />} path="/home" />
          <Route element={<OutLoginLayout />} path="/" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
