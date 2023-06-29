import { Outlet, Navigate } from 'react-router-dom'

type Props = {
    children?: React.ReactNode
  };

const PrivateRoutes = ({children}: Props) => {
    let auth = {'token':true}
    return(
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes