import React, { useEffect, useState } from 'react'
import CTable from '../../components/table/CTable'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import { blockUsersRequest, getUsersRequest, getUsersStatisticRequest } from '../../redux/controller';
import { motion } from 'framer-motion';
import './seller.styles.scss'
import { Space } from 'antd';
import { ColumnsType } from 'rc-table/lib/interface';
import { IGetUsersRequest, IUser } from '../../common/user.interface';
import { ColumnType } from 'antd/lib/table';
import Utils from '../../utils/base-utils';
import { QUERY_PARAM } from '../../constants/get-api.constant';
import UserIcon from '../../assets/image/user.png'
import UserTick from '../../assets/image/user-tick.png'
import UserMinus from '../../assets/image/user-minus.png'
import UserBlock from '../../assets/image/user-remove.png'
import TotalBoxUser from '../../components/totalBox/TotalBoxUser';
import { USER_TYPE } from '../../enums/user.enums';

const statisticalUser = [
    {
        title: "Tổng số tài khoản",
        number: 8426,
        icon: UserIcon,
    },
    {
        title: "Tài khoản mới ",
        number: 4568,
        icon: UserTick,
    },
    {
        title: "Tài khoản đăng kí trc đó",
        number: 3858,
        icon: UserMinus,
    },
    {
        title: "Tài khoản bị chặn",
        number: 833,
        icon: UserBlock,
    }
]

const Seller = () => {
    const {
        userList,
        totalUserRecords,
        userStatistic
    } = useSelectorRoot((state) => state.management); // lấy ra state từ store
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
    const [isReponsive, setIsReponsive] = useState<boolean>(false);
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);
        if (window.innerWidth > 400) {
            setIsReponsive(false)
        }

        if (window.innerWidth <= 400) {
            setIsReponsive(true)
        }
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [windowSize]);
    const [textSearch, setTextSearch] = useState(''); // giá trị của ô search
    const [beginDate, setBeginDate] = useState('');  // giá trị của ngày bắt đầu
    const [endDate, setEndDate] = useState(''); // giá trị của ngày kết thúc
    const [currentSearchValue, setCurrentSearchValue] = useState<IGetUsersRequest>({
        size: QUERY_PARAM.size,
        offset: 0,
        type: USER_TYPE.SELLER
    }) // giá trị của request gọi api lấy danh sách user


    // Gọi api lấy ra danh sách user
    useEffect(() => {
        console.log(totalUserRecords)
        dispatch(getUsersStatisticRequest())
    }, [totalUserRecords])


    // Hàm thực hiện tính toán thời gian
    const handleChangeTime = (time: Date) => {
        const options = { timeZone: 'Asia/Ho_Chi_Minh' };
        const currentDateString = new Date().toLocaleString('en-US', options);
        const timeDateString = new Date(time).toLocaleString('en-US', options);

        // Convert the current date to UTC
        const currentDate = new Date(currentDateString);
        const timeDate = new Date(timeDateString);

        // Calculate the time difference in milliseconds
        const timeDiff = currentDate.getTime() - timeDate.getTime();

        // Calculate the time difference in seconds, minutes, hours, and days
        const secondsDiff = Math.floor(timeDiff / 1000);
        const minutesDiff = Math.floor(timeDiff / (1000 * 60));
        const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        // Determine the appropriate time unit based on the time difference
        let timeUnit;
        let timeValue;

        if (daysDiff > 0) {
            timeUnit = 'ngày';
            timeValue = daysDiff;
        } else if (hoursDiff > 0) {
            timeUnit = 'giờ';
            timeValue = hoursDiff;
        } else if (minutesDiff > 0) {
            timeUnit = 'phút';
            timeValue = minutesDiff;
        } else {
            timeUnit = 'giây';
            timeValue = secondsDiff;
        }

        // Construct the output message based on the time difference
        const outputMsg = `${timeValue} ${timeUnit} trước`;
        if (timeValue <= 0) return ('Vừa xong');

        return (outputMsg);
    }
    // Các cột của bảng
    const columns: ColumnType<IUser>[] = [
        {
            title: 'Số thứ tự',
            render: (_, __, rowIndex) => (
                <span className='span-table'>{rowIndex + 1}</span>
            )
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            render: (_, record) => (
                <Space size="middle">
                    <p>{Utils.formatPhoneNumber(record.phone)}</p>
                </Space>
            ),
        },
        {
            title: 'Thời điểm tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_, record) => (
                <Space >
                    <span>{new Date(record.createdAt).toLocaleDateString('en-GB')}</span>
                </Space>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        // {
        //   title: 'Tags',
        //   key: 'tags',
        //   dataIndex: 'tags',
        //   render: (_, { tags }) => (
        //     <>
        //       {tags.map((tag) => {
        //         let color = tag.length > 5 ? 'geekblue' : 'green';
        //         if (tag === 'loser') {
        //           color = 'volcano';
        //         }
        //         return (
        //           <Tag color={color} key={tag}>
        //             {tag.toUpperCase()}
        //           </Tag>
        //         );
        //       })}
        //     </>
        //   ),
        // },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={(event) => handleBlockUser(record)}>Block</a>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        dispatch(getUsersRequest(currentSearchValue))

    }, [])

    const dispatch = useDispatchRoot()

    // Hàm xử lý khi click vào nút block user
    const handleBlockUser = (record: any) => {
        const bodyrequest = {
            userId: record.id,
            currentSearchValue: currentSearchValue
        }
        dispatch(blockUsersRequest(bodyrequest));
    }

    // Hàm xử lý khi thay đổi giá trị ô search
    const onChangeInput = (event: any) => {
        setTextSearch(event.target.value);
    }

    // Hàm xử lý khi thay đổi giá trị của ngày bắt đầu và ngày kết thúc
    const onChangeRangePicker = (event: any) => {
        if (event) {
            console.log(event[0].format('YYYY-MM-DD'));
            setBeginDate(event[0].format('YYYY-MM-DD'))
            setEndDate(event[1].format('YYYY-MM-DD'))
        }
    }

    // Hàm xử lý khi click vào nút search
    const onSearch = () => {
        console.log('hehee')
        const body: IGetUsersRequest = {
            size: QUERY_PARAM.size,
            offset: 0,
            search: textSearch,
            startTime: beginDate,
            endTime: endDate,
            status: '',
            sortBy: '',
            sortOrder: '',
            type: USER_TYPE.SELLER

        };
        const finalBody = Utils.getRidOfUnusedProperties(body)
        setCurrentSearchValue(finalBody);
        dispatch(getUsersRequest(finalBody))
    }

    // Hàm xử lý khi thay đổi giá trị của pagination
    const onChangePagination = (event: any) => {
        currentSearchValue.offset = (event - 1) * QUERY_PARAM.size;
        setCurrentSearchValue(currentSearchValue);
        dispatch(getUsersRequest(currentSearchValue))
    }

    return (
        <motion.div className='user-main'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className="statistical-user">
                <TotalBoxUser
                    key={0}
                    title={"Tổng số người dùng"}
                    number={userStatistic?.totalUser ? userStatistic?.totalUser.toString() : '0'}
                    icon={""}
                />
                <TotalBoxUser
                    key={1}
                    title={"Tổng số người dùng bị block"}
                    number={userStatistic?.totalUserBlock ? userStatistic?.totalUserBlock.toString() : '0'}
                    icon={""}
                />
            </div>
            <div className='table-area'>
                <CTable
                    tableMainTitle='Danh sách tài khoản bán hàng'
                    allowDateRangeSearch={true}
                    allowTextSearch={true}
                    onChangeInput={onChangeInput}
                    onChangeRangePicker={onChangeRangePicker}
                    onSearch={onSearch}
                    data={userList}
                    titleOfColumnList={columns}
                    totalRecord={totalUserRecords}
                    onChangePagination={onChangePagination}
                />
            </div>
        </motion.div>
    )
}

export default Seller