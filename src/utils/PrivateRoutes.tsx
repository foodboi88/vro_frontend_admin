import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useSelectorRoot } from '../redux/store';
import { useEffect } from 'react';

type Props = {
    children?: React.ReactNode
  };

const PrivateRoutes = ({children}: Props) => {
    const {
        userRole,
        tokenLogin
    } = useSelectorRoot((state) => state.login);


    // useEffect(()=>{
    //     if(userRole === 'admin'){
    //         navigate('/management')
    //     }
    // },[userRole])

    return(
        userRole === 'admin' && tokenLogin ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes