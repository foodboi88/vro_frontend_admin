import { Space } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { IGetSketchRequest, ISketch } from '../../common/sketch.interface';
import { IGetUsersRequest } from '../../common/user.interface';
import CTable from '../../components/table/CTable';
import TotalBoxUser from '../../components/totalBox/TotalBoxUser';
import { QUERY_PARAM } from '../../constants/get-api.constant';
import { getSketchsStatisticRequest, blockUsersRequest, getSketchsRequest, getReportsStatisticRequest, getReportsRequest } from '../../redux/controller';
import { useSelectorRoot, useDispatchRoot } from '../../redux/store';
import Utils from '../../utils/base-utils';
import { IReport } from '../../common/report.interface';

const Report = () => {
    const {
        reportList,
        totalReportRecords,
        reportStatistic
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
    
    
      useEffect(() => {
        dispatch(getReportsStatisticRequest())
        
      }, [totalReportRecords])
    
      const columns: ColumnType<IReport>[] = [
        {
          title: 'status',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'describe',
          dataIndex: 'describe',
          key: 'describe',
        },
        {
          title: 'createdAt',
          dataIndex: 'createdAt',
          key: 'createdAt',
        },
        {
          title: 'updatedAt',
          dataIndex: 'updatedAt',
          key: 'updatedAt',
        },
        {
          title: 'userName',
          dataIndex: 'userName',
          key: 'userName',
        },
        {
          title: 'userRole',
          dataIndex: 'userRole',
          key: 'userRole',
        },
        {
          title: 'updatedAt',
          dataIndex: 'updatedAt',
          key: 'updatedAt',
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
        dispatch(getReportsRequest(finalBody))
      }
    
      const onChangePagination = (event: any) => {
        currentSearchValue.offset = (event - 1) * QUERY_PARAM.size;
        setCurrentSearchValue(currentSearchValue);
        dispatch(getSketchsRequest(currentSearchValue))
      }
    
      return (
        <motion.div className='sketch-main'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <div>
            <div className="statistical-user">
              <TotalBoxUser
                  key={0}
                  title={"Tổng số phản hồi toàn sàn"}
                  number={reportStatistic?.totalReport ? reportStatistic?.totalReport : 0}
                  icon={''}
              />
              <TotalBoxUser
                  key={1}
                  title={"Số phản hồi chưa giải quyết"}
                  number={reportStatistic?.TotalNoProcess ? reportStatistic?.TotalNoProcess : 0}
                  icon={''}
              />
              <TotalBoxUser
                  key={1}
                  title={"Số phản hồi mới"}
                  number={reportStatistic?.totalReportNew ? reportStatistic?.totalReportNew : 0}
                  icon={''}
              />
              <TotalBoxUser
                  key={1}
                  title={"Số phản hồi đang xử lý"}
                  number={reportStatistic?.totalReportProcessed ? reportStatistic?.totalReportProcessed : 0}
                  icon={''}
              />
            </div>
          </div>
          <div className='table-area'>
            <CTable
              tableMainTitle='Danh sách phản hồi'
              allowDateRangeSearch={true}
              allowTextSearch={true}
              onChangeInput={onChangeInput}
              onChangeRangePicker={onChangeRangePicker}
              onSearch={onSearch}
              data={reportList}
              titleOfColumnList={columns}
              totalRecord={totalReportRecords}
              onChangePagination={onChangePagination}
            />
          </div>
        </motion.div>
      )
}

export default Report