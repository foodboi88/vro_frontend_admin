import React from 'react'
import Header from '../../components/header/header'
import Sidebar from '../../components/sidebar/sidebar'
import './in-login.styles.scss'

const InLoginLayout = () => {
    return (
        <div className="main-home">
            <Header />
            <Sidebar />
        </div>
    )
}

export default InLoginLayout