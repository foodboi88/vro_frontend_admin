import React, { useEffect, useRef, useState } from 'react'
import './style.statistical.scss'
import { Button } from 'antd'
import { motion } from 'framer-motion'
import StatisticalChart from './StatisticalChart'

const Statistical = () => {

    const [type, setType] = useState<string>('day')
    const [dataChart, setDataChart] = useState<any>([])

    return (
        <div className="main-statistical">
            <div className="statistical-title">
                <div className='title-text'>
                    Báo cáo doanh thu
                </div>
                <div className='type-statistical'>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`type-item ${type === 'day' ? 'active' : ''}`}
                        onClick={() => setType('day')}
                    >
                        Ngày
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`type-item ${type === 'month' ? 'active' : ''}`}
                        onClick={() => setType('month')}
                    >
                        Tháng
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`type-item ${type === 'quarter' ? 'active' : ''}`}
                        onClick={() => setType('quarter')}
                    >
                        Quý
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`type-item ${type === 'year' ? 'active' : ''}`}
                        onClick={() => setType('year')}
                    >
                        Năm
                    </motion.div>
                </div>
            </div>
            <StatisticalChart
                type={type}
                data={dataChart}
            />
        </div>
    )
}

export default Statistical