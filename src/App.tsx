import { AnimatePresence } from 'framer-motion';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import './App.styles.scss';
import InLoginLayout from './layouts/in-login/in-login';
import OutLoginLayout from './layouts/out-login/out-login';
import Bill from './pages/bill/bill';
import BuyerDemand from './pages/buyer-demand/buyer-demand';
import BannerHomepage from './pages/custom-ui/banner-homepage/banner-homepage';
import MissionPage from './pages/custom-ui/mission-page/mission-page';
import General from './pages/general/general';
import HomePage from './pages/homepage/homepage';
import Report from './pages/report/report';
import SellerRequest from './pages/seller-request/seller-request';
import Seller from './pages/seller/seller';
import Sketch from './pages/sketch/sketch';
import User from './pages/user/user';
import WithdrawRequest from './pages/withdraw-request/withdraw-request';
import PrivateRoutes from './utils/PrivateRoutes';
import { useEffect } from 'react';
import { getUserInfoRequest } from './redux/controller';
import { useDispatchRoot, useSelectorRoot } from './redux/store';
import ChangeAvatar from './pages/change-avatar/ChangeAvatar';


function App() {

  const dispatch = useDispatchRoot();
  const { tokenLogin, accesstokenExpỉred } = useSelectorRoot((state) => state.login);

  useEffect(() => {
    let checkLogin = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    if (checkLogin) {
      checkLogin = checkLogin.slice(1);
      checkLogin = checkLogin.slice(0, checkLogin.length - 1);
      dispatch(getUserInfoRequest(checkLogin));
    }
  }, []);

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
                <Route element={<BuyerDemand />} path='/management/buyer-demand' />
                <Route element={<WithdrawRequest />} path='/management/withdraw-requests' />
                <Route element={<Bill />} path='/management/bill' />
                <Route element={<HomePage />} path='/management/homepage' />


                <Route element={<MissionPage />} path="/management/mission-page" />
                <Route element={<BannerHomepage />} path="/management/banner-home-page" />
                <Route element={<ChangeAvatar />} path='/management/change-avatar' />
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
