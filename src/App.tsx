import './App.css';
import './App.styles.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes'
import OutLoginLayout from './layouts/out-login/out-login';
import InLoginLayout from './layouts/in-login/in-login';
import General from './pages/general/general';
import Sketch from './pages/sketch/sketch';
import User from './pages/user/user';
function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<InLoginLayout />} path="/management" >
              <Route element={<General />} path="/management" />
              <Route element={<Sketch />} path="/management/sketch" />
              <Route element={<User />} path="/management/user" />
            </Route>
          </Route>
          <Route element={<OutLoginLayout />} path="/" />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
