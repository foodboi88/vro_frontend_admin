import React, { useState } from 'react'
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

    const [active, setActive] = useState<number>(1)

    return (
        <div className="main-sidebar">
            <div className="sidebar-logo">
                <img src={Logo} alt="" />
                <span>Vro Group</span>
            </div>
            <div className="sidebar-menu">
                <div className={'sidebar-item' + (active === 1 ? ' active' : ' ')} onClick={() => setActive(1)}>
                    <BiGridAlt />
                    <span>Tổng quan</span>
                </div>
                <div className={'sidebar-item' + (active === 2 ? ' active' : '')} onClick={() => setActive(2)}>
                    <BsFillPersonFill />
                    <span>Quản lý tài khoản</span>
                </div>
                <div className={'sidebar-item' + (active === 3 ? ' active' : '')} onClick={() => setActive(3)}>
                    <HiOutlineNewspaper />
                    <span>Quản lý bài viết</span>
                </div>
                <div className={'sidebar-item' + (active === 4 ? ' active' : '')} onClick={() => setActive(4)}>
                    <RiMoneyDollarCircleLine />
                    <span>Quản lý thanh toán</span>
                </div>
                <div className={'sidebar-item' + (active === 5 ? ' active' : '')} onClick={() => setActive(5)}>
                    <ImStatsDots />
                    <span>Công cụ marketing</span>
                </div>
                <div className={'sidebar-item' + (active === 6 ? ' active' : '')} onClick={() => setActive(6)}>
                    <AiOutlineKey />
                    <span>Quản lý từ khóa</span>
                </div>
                <div className={'sidebar-item' + (active === 7 ? ' active' : '')} onClick={() => setActive(7)}>
                    <AiFillGift />
                    <span>Quản lý khuyến mãi</span>
                </div>
                <div className={'sidebar-item' + (active === 8 ? ' active' : '')} onClick={() => setActive(8)}>
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