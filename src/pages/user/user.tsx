import React, { useEffect, useState } from 'react'
import CTable from '../../components/table/CTable'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import { blockUsersRequest, getUsersRequest } from '../../redux/controller';
import { motion } from 'framer-motion';
import './user.styles.scss'
import { Space } from 'antd';
import { ColumnsType } from 'rc-table/lib/interface';
import { IGetUsersRequest, IUser } from '../../common/user.interface';
import { ColumnType } from 'antd/lib/table';
import Utils from '../../utils/base-utils';
import { QUERY_PARAM } from '../../constants/get-api.constant';
const User = () => {
    const {
        userList,
        totalUserRecords
    } = useSelectorRoot((state) => state.management);

    const [textSearch, setTextSearch] = useState('');
    const [beginDate, setBeginDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentSearchValue, setCurrentSearchValue] = useState<IGetUsersRequest>(
      {
        size: QUERY_PARAM.size,
        offset: 0
      }
    )
    

    useEffect(()=> {
      console.log(totalUserRecords)
    },[totalUserRecords])

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
              <a onClick={(event)=>handleBlockUser(record)}>Block</a>
              <a>Delete</a>
            </Space>
          ),
        },
      ];

    const dispatch = useDispatchRoot()

    const handleBlockUser = (record: any) => {
      const bodyrequest = {
        userId: record.id,
        currentSearchValue: currentSearchValue
      }
      dispatch(blockUsersRequest(bodyrequest));
    }

    const onChangeInput = (event: any) => {
        setTextSearch(event.target.value);
    }

    const onChangeRangePicker = (event: any) => {
        if(event){
          setBeginDate(event[0].format('YYYY-MM-DD'))
          setEndDate(event[1].format('YYYY-MM-DD'))
        }
    }

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

    const onChangePagination = ( event: any) => {
      currentSearchValue.offset = (event-1)*QUERY_PARAM.size ; 
      setCurrentSearchValue(currentSearchValue);
      dispatch(getUsersRequest(currentSearchValue))
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
                    totalRecord= {totalUserRecords}
                    onChangePagination = {onChangePagination}
                />
            </div>
        </motion.div>
    )
}

export default User