import React from 'react'
import Header from '../../components/header/header'
import Sidebar from '../../components/sidebar/sidebar'
import './style.home.scss'
const home = () => {
    return (
        <div className="main-home">
            <Header />
            <Sidebar />
        </div>
    )
}

export default home