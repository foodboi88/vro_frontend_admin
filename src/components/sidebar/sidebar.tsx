import React, { useEffect, useState } from 'react'
import './style.sidebar.scss'
import Logo from '../../assets/image/logo.png'
import { BiGridAlt } from 'react-icons/bi'
import { BsFillPersonFill } from 'react-icons/bs'
import { HiOutlineNewspaper } from 'react-icons/hi'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { ImStatsDots } from 'react-icons/im'
import { AiOutlineKey, AiFillGift, AiOutlineQuestionCircle, AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { BiSolidLogIn } from 'react-icons/bi'
import { GoDotFill, GoDot } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
const Sidebar = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState<number>(1)
    const [subActive, setSubActive] = useState<number>(1)

    useEffect(() => {
		if (window.location.pathname === "/management") setActive(1);
		if (window.location.pathname === "/management/user") setSubActive(2);
		if (window.location.pathname === "/management/seller") setSubActive(1);

		if (window.location.pathname === "/management/sketch") setActive(3);
		if (window.location.pathname === "/management/bill") setActive(4);
		if (window.location.pathname === "/management/seller-requests") setActive(6);
		if (window.location.pathname === "/management/withdraw-requests") setActive(7);
        if (window.location.pathname === "/management/report") setActive(8);

	}, []);

    return (
        <div className="main-sidebar">
            <div className="sidebar-logo">
                <img src={Logo} alt="" />
                <span>Vro Group</span>
            </div>
            <div className="sidebar-menu">
                <div className={'sidebar-item' + (active === 1 ? ' active' : ' ')} onClick={() => {
                    setActive(1)
                    navigate('/management')
                }}>
                    <BiGridAlt />
                    <span>Tổng quan</span>
                </div>
                <div className={'sidebar-item' + (active === 2 ? ' active' : '')} onClick={() => {
                    setActive(2)
                    navigate('/management/user')
                }}>
                    <BsFillPersonFill />
                    <span>Quản lý tài khoản</span>
                    {active === 2 ? <AiOutlineUp /> : <AiOutlineDown />}
                </div>
                {active === 2 &&
                    <motion.div className={'sub-sidebar'}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.3 }}
                    >
                        <div className={'sub-sidebar-item' + (subActive === 1 ? ' active' : '')}
                            onClick={() => {
                                setSubActive(1)
                                navigate('/management/seller')
                            }}>
                            {subActive === 1 ? <GoDotFill /> : <GoDot />}
                            <span>Tài khoản người bán</span>
                        </div>
                        <div className={'sub-sidebar-item' + (subActive === 2 ? ' active' : '')}
                            onClick={() => {
                                setSubActive(2)
                                navigate('/management/user')
                            }}>
                            {subActive === 2 ? <GoDotFill /> : <GoDot />}
                            <span>Tài khoản người mua</span>
                        </div>
                    </motion.div>
                }
                <div className={'sidebar-item' + (active === 3 ? ' active' : '')} onClick={() => {
                    setActive(3)
                    navigate('/management/sketch')
                }}>
                    <HiOutlineNewspaper />
                    <span>Quản lý sản phẩm</span>
                </div>
                <div className={'sidebar-item' + (active === 4 ? ' active' : '')} onClick={() => {
                    setActive(4)
                    navigate('/management/bill')
                }}>
                    <RiMoneyDollarCircleLine />
                    <span>Quản lý đơn hàng</span>
                </div>
                <div className={'sidebar-item' + (active === 5 ? ' active' : '')} onClick={() => setActive(5)}>
                    <ImStatsDots />
                    <span>Công cụ marketing</span>
                </div>
                <div className={'sidebar-item' + (active === 6 ? ' active' : '')} onClick={() => {
                    setActive(6)
                    navigate('/management/seller-requests')
                }}>
                    <AiOutlineKey />
                    <span>Yêu cầu bán hàng</span>
                </div>
                <div className={'sidebar-item' + (active === 7 ? ' active' : '')} onClick={() => {
                    setActive(7)
                    navigate('/management/withdraw-requests')
                }}>
                    <AiFillGift />
                    <span>Yêu cầu rút tiền</span>
                </div>
                <div className={'sidebar-item' + (active === 8 ? ' active' : '')} onClick={() => {
                    setActive(8)
                    navigate('/management/report')
                }}>
                    <AiOutlineQuestionCircle />
                    <span>Giải quyết phản hồi</span>
                </div>
            </div>
            <div className='sidebar-logout'>
                <BiSolidLogIn />
                <span>Đăng xuất</span>
            </div>
        </div >
    )
}

export default Sidebar