import React, { useEffect, useState } from 'react'
import CTable from '../../components/table/CTable'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import { blockUsersRequest, getUsersRequest, getUsersStatisticRequest } from '../../redux/controller';
import { motion } from 'framer-motion';
import './user.styles.scss'
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

const User = () => {
    const {
        userList,
        totalUserRecords,
        userStatistic
    } = useSelectorRoot((state) => state.management); // lấy ra state từ store

    const [textSearch, setTextSearch] = useState(''); // giá trị của ô search
    const [beginDate, setBeginDate] = useState('');  // giá trị của ngày bắt đầu
    const [endDate, setEndDate] = useState(''); // giá trị của ngày kết thúc
    const [currentSearchValue, setCurrentSearchValue] = useState<IGetUsersRequest>({
        size: QUERY_PARAM.size,
        offset: 0
    }) // giá trị của request gọi api lấy danh sách user


    // Gọi api lấy ra danh sách user
    useEffect(() => {
        console.log(totalUserRecords)
        dispatch(getUsersStatisticRequest())
    }, [totalUserRecords])

    // Các cột của bảng
    const columns: ColumnType<IUser>[] = [
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
        },
        {
            title: 'Thời điểm tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
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
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={(event) => handleBlockUser(record)}>Block</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    

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
                    number={userStatistic?.totalUser ? userStatistic?.totalUser : 0}
                    icon={""}
                />
                <TotalBoxUser
                    key={1}
                    title={"Tổng số người dùng bị block"}
                    number={userStatistic?.totalUserBlock ? userStatistic?.totalUserBlock : 0}
                    icon={""}
                />
            </div>
            <div className='table-area'>
                <CTable
                    tableMainTitle='Danh sách tài khoản'
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

export default User