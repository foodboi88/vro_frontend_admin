import React from 'react'
import './style.sidebar.scss'
import Logo from '../../assets/image/logo.png'
import { BiGridAlt } from 'react-icons/bi'
import { BsFillPersonFill } from 'react-icons/bs'
import { HiOutlineNewspaper } from 'react-icons/hi'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { ImStatsDots } from 'react-icons/im'
import { AiOutlineKey, AiFillGift, AiOutlineQuestionCircle } from 'react-icons/ai'
import { BiSolidLogIn } from 'react-icons/bi'
const Sidebar = () => {
    return (
        <div className="main-sidebar">
            <div className="sidebar-logo">
                <img src={Logo} alt="" />
                <span>Vro Group</span>
            </div>
            <div className="sidebar-menu">
                <div className='sidebar-item'>
                    <BiGridAlt />
                    <span>Tổng quan</span>
                </div>
                <div className='sidebar-item'>
                    <BsFillPersonFill />
                    <span>Quản lý tài khoản</span>
                </div>
                <div className='sidebar-item'>
                    <HiOutlineNewspaper />
                    <span>Quản lý bài viết</span>
                </div>
                <div className='sidebar-item'>
                    <RiMoneyDollarCircleLine />
                    <span>Quản lý thanh toán</span>
                </div>
                <div className='sidebar-item'>
                    <ImStatsDots />
                    <span>Công cụ marketing</span>
                </div>
                <div className='sidebar-item'>
                    <AiOutlineKey />
                    <span>Quản lý từ khóa</span>
                </div>
                <div className='sidebar-item'>
                    <AiFillGift />
                    <span>Quản lý khuyến mãi</span>
                </div>
                <div className='sidebar-item'>
                    <AiOutlineQuestionCircle />
                    <span>Giải quyết phản hồi</span>
                </div>
            </div>
            <div className='sidebar-logout'>
                <BiSolidLogIn />
                <span>Đăng xuất</span>
            </div>
        </div>
    )
}

export default Sidebar