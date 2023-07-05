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
                    number: overviewStatistic.totalRevenue,
                    icon: CoinIcon
                },
                {
                    title: "Tổng số người bán",
                    number: overviewStatistic.totalSeller,
                    icon: ShopIcon
                },
                {
                    title: "Tổng số người mua",
                    number: overviewStatistic.totalUser,
                    icon: UserIcon
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
                {TotalBoxData.map((item: { title: string; number: number; icon: any }, index: React.Key | null | undefined) => (
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