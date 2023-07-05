import React, { useEffect, useRef, useState } from 'react'
import './style.statistical.scss'
import { Button, DatePicker, notification } from 'antd'
import { motion } from 'framer-motion'
import StatisticalChart from './StatisticalChart'
import is from 'date-fns/esm/locale/is'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store'
import { getOverviewStatisticDayRequest } from '../../redux/controller'
const { RangePicker } = DatePicker;

const Statistical = () => {

    const [type, setType] = useState<string>('day') // Biến lưu trữ loại thống kê
    const [dataChart, setDataChart] = useState<any>([]) // Biến lưu trữ dữ liệu thống kê
    const [startDate, setStartDate] = useState<string>('') // Biến lưu trữ ngày bắt đầu thống kê
    const [endDate, setEndDate] = useState<string>('') // Biến lưu trữ ngày kết thúc thống kê
    const dispatch = useDispatchRoot() // dispatch action   
    const { overViewStatisticDay } = useSelectorRoot((state) => state.management); // lấy ra state từ store


    // Hàm gọi khi thay đổi ngày thống kê
    const handleChangeDate = (date: any) => {
        if (date) {
            setStartDate(date[0].format('YYYY-MM-DD'))
            setEndDate(date[1].format('YYYY-MM-DD'))
        }
    }

    const isDateRangeValid = (startDate: string, endDate: string) => {
        const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

        const start = new Date(startDate);
        const end = new Date(endDate);

        const diffInDays = Math.round(Math.abs((end.getTime() - start.getTime()) / oneDay));

        return diffInDays <= 7;
    }


    useEffect(() => {
        if (startDate && endDate) {
            if (isDateRangeValid(startDate, endDate)) {
                if (type === 'day') {
                    console.log(startDate, endDate);
                    const req = {
                        startDay: startDate,
                        endDay: endDate
                    }
                    dispatch(getOverviewStatisticDayRequest(req))
                }
            }
            else {
                notification.error({
                    message: 'Lấy dữ liệu không thành công',
                    description: 'Khoảng thời gian thống kê không được vượt quá 7 ngày',
                });
            }
        }

    }, [startDate, endDate])

    useEffect(() => {
        overViewStatisticDay && setDataChart(overViewStatisticDay);

    }, [overViewStatisticDay])

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

                    <RangePicker placeholder={['Ngày bắt đầu', 'Ngày kết thúc']} onChange={handleChangeDate} />

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