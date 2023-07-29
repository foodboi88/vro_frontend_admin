import React, { useEffect, useState } from 'react'
import TotalBox from '../../components/totalBox/TotalBox'
import CoinIcon from '../../assets/image/coin.png'
import ShopIcon from '../../assets/image/shop.png'
import UserIcon from '../../assets/image/3-user.png'

import './general.styles.scss'
import { motion } from 'framer-motion'
import Statistical from '../../components/statistical/Statistical'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store'
import { getOverviewStatisticRequest } from '../../redux/controller'
import Utils from '../../utils/base-utils'


const General = () => {
    const { overviewStatistic } = useSelectorRoot((state) => state.management); // lấy ra state từ store
    const dispatch = useDispatchRoot() // dispatch action   
    const [TotalBoxData, setTotalBoxData] = useState<any>([]) // state của component

    // Gọi api lấy ra tổng số người bán, người mua, tổng doanh thu
    useEffect(() => {
        dispatch(getOverviewStatisticRequest());
    }, [])

    // Gán dữ liệu vào state của component
    useEffect(() => {
        if (overviewStatistic) {
            const tmp = [
                {
                    title: "Tổng doanh thu",
                    number: Utils.formatMoney(overviewStatistic.totalRevenue) + ' VND',
                    icon: CoinIcon
                },
                {
                    title: "Tổng đơn đặt hàng",
                    number: overviewStatistic.totalOrder,
                    icon: ShopIcon
                },
                {
                    title: "Tổng số người dùng",
                    number: overviewStatistic.totalUser,
                    icon: ShopIcon
                },
                {
                    title: "Tổng số người bán",
                    number: overviewStatistic.totalSeller,
                    icon: ShopIcon
                },
                {
                    title: "Tổng số người mua",
                    number: overviewStatistic.totalBuyer,
                    icon: UserIcon
                },
                {
                    title: "Tổng tiền chưa tất toán",
                    number: overviewStatistic.totalWithDrawal,
                    icon: ShopIcon
                },

            ]
            setTotalBoxData(tmp)
        }
    }, [overviewStatistic])


    return (
        <motion.div
            className="main-general"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className='total-boxs'>
                {TotalBoxData.map((item: any, index: React.Key | null | undefined) => (
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