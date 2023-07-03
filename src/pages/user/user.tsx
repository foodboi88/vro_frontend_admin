import React, { useState } from 'react'
import CTable from '../../components/table/CTable'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import { getUsersRequest } from '../../redux/controller';
import { motion } from 'framer-motion';
import './user.styles.scss'
import { Space } from 'antd';
import { ColumnsType } from 'rc-table/lib/interface';
import { IUser } from '../../common/user.interface';
import { ColumnType } from 'antd/lib/table';
const User = () => {
    const {
        userList
    } = useSelectorRoot((state) => state.management);
    const [textSearch, setTextSearch] = useState('');
    const [beginDate, setBeginDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const columns: ColumnType<IUser>[] = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Status',
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
              <a>Block {record.name}</a>
              <a>Delete</a>
            </Space>
          ),
        },
      ];

    const dispatch = useDispatchRoot()

    const onChangeInput = (event: any) => {
        setTextSearch(event.target.value);
    }

    const onChangeRangePicker = (event: any) => {
        console.log(event)
    }

    const onSearch = () => {
        console.log('hehee')
        const body: any = {
            size: 20,
            offset: 0
        };
        dispatch(getUsersRequest(body))
    }

    return (
        <motion.div className='user-main'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div>Statistic overall</div>
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
                />
            </div>
        </motion.div>
    )
}

export default User