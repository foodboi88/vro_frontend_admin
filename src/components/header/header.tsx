import { Avatar, Badge, Drawer, Dropdown, Input, MenuProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { SearchOutlined, BellOutlined, MessageOutlined, DownOutlined } from '@ant-design/icons';
import './style.header.scss'
import UserIcon from '../../assets/image/user-icon.png'
import { Link, useNavigate } from 'react-router-dom';
import Utils from '../../utils/base-utils';
import Logo from '../../assets/image/logo-red.png'
import { BiGridAlt } from 'react-icons/bi'
import { BsFillPersonFill } from 'react-icons/bs'
import { HiOutlineNewspaper } from 'react-icons/hi'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { ImStatsDots } from 'react-icons/im'
import { AiOutlineKey, AiFillGift, AiOutlineQuestionCircle, AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { BiSolidLogIn } from 'react-icons/bi'
import { GoDotFill, GoDot } from 'react-icons/go'
import { AiOutlineMenu } from 'react-icons/ai'
import { motion } from 'framer-motion';
const Header = () => {
    const items: MenuProps["items"] = [
        {
            key: "4",
            label: "Đăng xuất",
            onClick: () => onClickLogout()
        },
    ];

    const onClickLogout = () => {
        localStorage.clear();
        window.location.reload();
    }

    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
    const [isReponsive, setIsReponsive] = useState<boolean>(false);
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

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

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (

        <div className="main-header">
            {isReponsive &&
                <div className="sidebar-logo">
                    <img src={Logo} alt="" />
                </div>
            }
            <div className='input-header'>
                <Input
                    className='input-search'
                    placeholder="Tìm kiếm"
                />
                <SearchOutlined className='icon-header' />
            </div>
            <div className="icon-group">
                {/* <Badge count={5} size="small">
                    <BellOutlined />
                </Badge>
                <Badge count={5} size="small">
                    <MessageOutlined />
                </Badge> */}
                <div className="user-info-content">
                    <Avatar className="avatar" src={UserIcon} />
                    <div className="name-and-balance">
                        <div className="name">Bùi Thị Hương</div>
                        <div className="balance">
                            SD: {"1tr500"}
                        </div>
                    </div>
                    <Dropdown
                        className="drop-down"
                        menu={{ items }}
                        placement="bottomLeft"
                        arrow
                    >
                        <DownOutlined />
                    </Dropdown>
                </div>
                {isReponsive &&
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <AiOutlineMenu className="icon-menu" onClick={showDrawer} />
                    </motion.div>
                }
            </div>
            <Drawer className='drawr-header' title="VRO GROUP" placement="right" onClose={onClose} open={open}>
                <div className="sidebar-menu">
                    <div className={'sidebar-item'} onClick={() => {
                        navigate('/management')
                        onClose()
                    }}>
                        <BiGridAlt />
                        <span>Tổng quan</span>
                    </div>
                    <div className={'sidebar-item'} onClick={() => {
                        navigate('/management/user')
                        onClose()
                    }}>
                        <BsFillPersonFill />
                        <span>Quản lý tài khoản</span>
                    </div>

                    <div className={'sidebar-item'} onClick={() => {
                        navigate('/management/sketch')
                        onClose()
                    }}>
                        <HiOutlineNewspaper />
                        <span>Quản lý sản phẩm</span>
                    </div>
                    <div className={'sidebar-item'} onClick={() => {
                        navigate('/management/bill')
                        onClose()
                    }}>
                        <RiMoneyDollarCircleLine />
                        <span>Quản lý đơn hàng</span>
                    </div>
                    <div className={'sidebar-item'} >
                        <ImStatsDots />
                        <span>Công cụ marketing</span>
                    </div>
                    <div className={'sidebar-item'} onClick={() => {
                        navigate('/management/seller-requests')
                        onClose()
                    }}>
                        <AiOutlineKey />
                        <span>Yêu cầu bán hàng</span>
                    </div>
                    <div className={'sidebar-item'} onClick={() => {
                        navigate('/management/withdraw-requests')
                        onClose()
                    }}>
                        <AiFillGift />
                        <span>Yêu cầu rút tiền</span>
                    </div>
                    <div className={'sidebar-item'} onClick={() => {
                        navigate('/management/report')
                        onClose()
                    }}>
                        <AiOutlineQuestionCircle />
                        <span>Giải quyết phản hồi</span>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default Header