import { Outlet, Navigate } from 'react-router-dom'

type Props = {
    children?: React.ReactNode
  };

const PrivateRoutes = ({children}: Props) => {
    let auth = {'token':false}
    return(
        auth.token ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes