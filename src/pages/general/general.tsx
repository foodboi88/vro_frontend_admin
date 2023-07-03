import React from 'react'
import TotalBox from '../../components/totalBox/TotalBox'
import CoinIcon from '../../assets/image/coin.png'
import ShopIcon from '../../assets/image/shop.png'
import UserIcon from '../../assets/image/user.png'

import './user.styles.scss'
import { motion } from 'framer-motion'
import Statistical from '../../components/statistical/Statistical'

const TotalBoxData = [
    {
        title: "Tổng doanh thu",
        number: 10033567,
        icon: CoinIcon
    },
    {
        title: "Tổng số người bán",
        number: 258,
        icon: ShopIcon
    },
    {
        title: "Tổng số người mua",
        number: 1045,
        icon: UserIcon
    }
]

const General = () => {
    return (
        <motion.div
            className="main-general"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className='total-boxs'>
                {TotalBoxData.map((item, index) => (
                    <TotalBox
                        key={index}
                        title={item.title}
                        number={item.number}
                        icon={item.icon}
                    />
                ))}
            </div>

            <Statistical />
        </motion.div>
    )
}

export default General