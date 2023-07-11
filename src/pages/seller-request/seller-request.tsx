import { Space } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { IGetSketchRequest, ISketch } from '../../common/sketch.interface';
import { IGetUsersRequest, ISellerRequest } from '../../common/user.interface';
import CTable from '../../components/table/CTable';
import TotalBoxUser from '../../components/totalBox/TotalBoxUser';
import { QUERY_PARAM } from '../../constants/get-api.constant';
import { getSketchsStatisticRequest, blockUsersRequest, getSketchsRequest, approveSellerRequest, getSellerRequests } from '../../redux/controller';
import { useSelectorRoot, useDispatchRoot } from '../../redux/store';
import Utils from '../../utils/base-utils';

const SellerRequest = () => {
    const {
        sellerRequestList,
        numberOfSellerRequest,
      } = useSelectorRoot((state) => state.management);
    
      const [textSearch, setTextSearch] = useState('');
      const [beginDate, setBeginDate] = useState('');
      const [endDate, setEndDate] = useState('');
      const [currentSearchValue, setCurrentSearchValue] = useState<IGetSketchRequest>(
        {
          size: QUERY_PARAM.size,
          offset: 0
        }
      )
    
    
    
      const columns: ColumnType<ISellerRequest>[] = [
        {
          title: 'Tình trạng',
          dataIndex: 'isApproved',
          key: 'isApproved',
          render: (_, record) => {
            if(record.isApproved) return (
                <Space size="middle">
                  <span>Đã chấp nhận</span>
                </Space>
              )
            else return (
                <Space size="middle">
                  <span>Chưa chấp nhận</span>
                </Space>
            )
          },
        },
        {
          title: 'CCCD',
          dataIndex: 'identityCardNumber',
          key: 'identityCardNumber',
        },
        {
          title: 'Mã số thuế',
          dataIndex: 'vatCode',
          key: 'vatCode',
        },
        {
          title: 'Số tài khoản',
          dataIndex: 'bankAccountNumber',
          key: 'bankAccountNumber',
        },
        {
          title: 'Ngân hàng',
          dataIndex: 'bankName',
          key: 'bankName',
        },
        {
          title: 'Chi nhánh ngân hàng',
          dataIndex: 'bankBranch',
          key: 'bankBranch',
        },
        {
          title: 'Tạo lúc',
          dataIndex: 'createdAt',
          key: 'createdAt',
        },
        //   {
        //     title: 'updatedAt',
        //     dataIndex: 'updatedAt',
        //     key: 'updatedAt',
        // },
       
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
            title: 'SĐT',
            dataIndex: 'phone',
            key: 'phone',
          },
          {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
          },
        //   {
        //     title: 'dob',
        //     dataIndex: 'dob',
        //     key: 'dob',
        //   },
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
              <a onClick={(event) => handleApprove(record)}>Chấp nhận</a>
            </Space>
          ),
        },
      ];
    
      // let statisticalUser = [
      //   {
      //       title: "Tổng số bản vẽ toàn sàn",
      //       number: sketchStatistic?.totalSketch ? sketchStatistic?.totalSketch : 0,
      //       icon: UserIcon,
      //   },
     
      //   {
      //       title: "Tổng số bản vẽ mới",
      //       number: sketchStatistic?.totalNewSketch ? sketchStatistic?.totalNewSketch : 0,
      //       icon: UserMinus,
      //   },
      // ]

      useEffect(()=>{
        dispatch(getSellerRequests(currentSearchValue))

      },[])
    
      const dispatch = useDispatchRoot()
    
      const handleApprove = (record: any) => {
        const bodyrequest = {
          id: record.id,
          currentSearchValue: currentSearchValue
        }
        dispatch(approveSellerRequest(bodyrequest));
      }
    
      const onChangeInput = (event: any) => {
        setTextSearch(event.target.value);
      }
    
      const onChangeRangePicker = (event: any) => {
        if (event) {
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
        dispatch(getSellerRequests(finalBody))
      }
    
      const onChangePagination = (event: any) => {
        currentSearchValue.offset = (event - 1) * QUERY_PARAM.size;
        setCurrentSearchValue(currentSearchValue);
        dispatch(getSellerRequests(currentSearchValue))
      }
    
      return (
        <motion.div className='sketch-main'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          
          <div className='table-area'>
            <CTable
              tableMainTitle='Danh sách yêu cầu bán hàng'
              allowDateRangeSearch={true}
              allowTextSearch={true}
              onChangeInput={onChangeInput}
              onChangeRangePicker={onChangeRangePicker}
              onSearch={onSearch}
              data={sellerRequestList}
              titleOfColumnList={columns}
              totalRecord={numberOfSellerRequest}
              onChangePagination={onChangePagination}
            />
          </div>
        </motion.div>
      )
}

export default SellerRequest