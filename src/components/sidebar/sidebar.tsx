import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { AiOutlineDown, AiOutlineKey, AiOutlineQuestionCircle, AiOutlineUp } from 'react-icons/ai'
import { BiGridAlt, BiSolidLogIn } from 'react-icons/bi'
import { BsFillPersonFill } from 'react-icons/bs'
import { GoDot, GoDotFill } from 'react-icons/go'
import { HiOutlineNewspaper } from 'react-icons/hi'
import { IoIosImages } from "react-icons/io"
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/image/logo.png'
import './style.sidebar.scss'
const Sidebar = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState<number>(1)
    const [subActive, setSubActive] = useState<number>(1)
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
    const [isReponsive, setIsReponsive] = useState<boolean>(false);
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };
        if (window.location.pathname === "/management") setActive(1);
        if (window.location.pathname === "/management/seller" || window.location.pathname === "/management/user") setActive(2);
        if (window.location.pathname === "/management/seller") setSubActive(1);
        if (window.location.pathname === "/management/user") setSubActive(2);

        window.addEventListener('resize', handleWindowResize);
        if (window.innerWidth > 800) {
            setIsReponsive(false)
        }

        if (window.innerWidth <= 800) {
            setIsReponsive(true)
        }
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [windowSize]);
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
        <>
            {!isReponsive &&
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
                            navigate('/management/homepage')
                        }}>
                            <RiMoneyDollarCircleLine />
                            <span>Quản lý kiến trúc sư</span>
                        </div>
                        {/* <div className={'sidebar-item' + (active === 5 ? ' active' : '')} onClick={() => setActive(5)}>
                            <ImStatsDots />
                            <span>Công cụ marketing</span>
                        </div> */}
                        <div className={'sidebar-item' + (active === 6 ? ' active' : '')} onClick={() => {
                            setActive(6)
                            navigate('/management/seller-requests')
                        }}>
                            <AiOutlineKey />
                            <span>Yêu cầu bán hàng</span>
                        </div>
                        {/* <div className={'sidebar-item' + (active === 7 ? ' active' : '')} onClick={() => {
                            setActive(7)
                            navigate('/management/withdraw-requests')
                        }}>
                            <AiFillGift />
                            <span>Yêu cầu rút tiền</span>
                        </div> */}
                        <div className={'sidebar-item' + (active === 8 ? ' active' : '')} onClick={() => {
                            setActive(8)
                            navigate('/management/report')
                        }}>
                            <AiOutlineQuestionCircle />
                            <span>Giải quyết phản hồi</span>
                        </div>

                        <div className={'sidebar-item' + (active === 9 ? ' active' : '')} onClick={() => {
                            setActive(9)
                            navigate('/management/mission-page')
                        }}>
                            <IoIosImages />
                            <span>Cấu hình sứ mệnh</span>
                        </div>

                        <div className={'sidebar-item' + (active === 10 ? ' active' : '')} onClick={() => {
                            setActive(10)
                            navigate('/management/banner-home-page')
                        }}>
                            <IoIosImages />
                            <span>Cấu hình banner trang chủ</span>
                        </div>
                    </div>
                    <div className='sidebar-logout'>
                        <BiSolidLogIn />
                        <span>Đăng xuất</span>
                    </div>
                </div >
            }
        </>
    )
}

export default Sidebar