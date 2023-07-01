import './App.css';
import './App.styles.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes'
import InLoginLayout from './layouts/in-login/in-login';
import OutLoginLayout from './layouts/out-login/out-login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
              <Route element={<InLoginLayout/>} path="/management"/>
          </Route>
          <Route element={<OutLoginLayout/>} path="/"/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
