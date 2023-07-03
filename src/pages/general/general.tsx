import React from 'react'
import TotalBox from '../../components/totalBox/TotalBox'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'

import './user.styles.scss'
const General = () => {
    return (
        <div className="main-general">
            <TotalBox
                title={"Tổng doanh thu"}
                number={10033567}
                icon={RiMoneyDollarCircleLine}
            />
        </div>
    )
}

export default General