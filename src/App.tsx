import './App.css';
import './App.styles.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes'
import OutLoginLayout from './layouts/out-login/out-login';
import InLoginLayout from './layouts/in-login/in-login';
import General from './pages/general/general';
import Sketch from './pages/sketch/sketch';
import User from './pages/user/user';
import { AnimatePresence } from 'framer-motion';
import Report from './pages/report/report';
import SellerRequest from './pages/seller-request/seller-request';
import WithdrawRequest from './pages/withdraw-request/withdraw-request';
import Bill from './pages/bill/bill';
import Seller from './pages/seller/seller';
function App() {

  return (
    <div className="App">
      <AnimatePresence>
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route element={<InLoginLayout />} path="/management" >
                <Route element={<General />} path="/management" />
                <Route element={<Sketch />} path="/management/sketch" />
                <Route element={<User />} path="/management/user" />
                <Route element={<Seller />} path="/management/seller" />

                <Route element={<Report />} path="/management/report" />
                <Route element={<SellerRequest />} path='/management/seller-requests' />
                <Route element={<WithdrawRequest />} path='/management/withdraw-requests' />
                <Route element={<Bill />} path='/management/bill' />

              </Route>
            </Route>
            <Route element={<OutLoginLayout />} path="/" />
          </Routes>
        </Router>
      </AnimatePresence>
    </div>
  );
}

export default App;
