import { Avatar, Badge, Dropdown, Input, MenuProps } from 'antd'
import React from 'react'
import { SearchOutlined, BellOutlined, MessageOutlined, DownOutlined } from '@ant-design/icons';
import './style.header.scss'
import UserIcon from '../../assets/image/user-icon.png'
import { Link, useNavigate } from 'react-router-dom';
import Utils from '../../utils/base-utils';

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

    return (
        <div className="main-header">
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
            </div>
        </div>
    )
}

export default Header