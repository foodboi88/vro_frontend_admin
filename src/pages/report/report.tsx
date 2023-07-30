import { Space } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import CTable from '../../components/table/CTable';
import TotalBoxUser from '../../components/totalBox/TotalBoxUser';
import { QUERY_PARAM } from '../../constants/get-api.constant';
import { getSketchsStatisticRequest, blockUsersRequest, getSketchsRequest, getReportsStatisticRequest, getReportsRequest } from '../../redux/controller';
import { useSelectorRoot, useDispatchRoot } from '../../redux/store';
import Utils from '../../utils/base-utils';
import { IGetReportsRequest, IReport } from '../../common/report.interface';

const Report = () => {
  const {
    reportList,
    totalReportRecords,
    reportStatistic
  } = useSelectorRoot((state) => state.management);

  const [textSearch, setTextSearch] = useState('');
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentSearchValue, setCurrentSearchValue] = useState<IGetReportsRequest>(
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
      title: 'Số thứ tự',
      render: (_, __, rowIndex) => (
        <span className='span-table'>{rowIndex + 1}</span>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Mô tả',
      dataIndex: 'describe',
      key: 'describe',
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'userName',
      key: 'userName',
    },

    // {
    //   title: 'Thao tác',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a onClick={(event) => handleBlockUser(record)}>Block</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];


  useEffect(() => {
    dispatch(getReportsRequest(currentSearchValue))

  }, [])

  const dispatch = useDispatchRoot()


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
    const body: IGetReportsRequest = {
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
            number={reportStatistic?.totalReport ? reportStatistic?.totalReport.toString() : '0'}
            icon={''}
          />
          <TotalBoxUser
            key={1}
            title={"Số phản hồi chưa giải quyết"}
            number={reportStatistic?.TotalNoProcess ? reportStatistic?.TotalNoProcess.toString() : '0'}
            icon={''}
          />
          <TotalBoxUser
            key={1}
            title={"Số phản hồi mới"}
            number={reportStatistic?.totalReportNew ? reportStatistic?.totalReportNew.toString() : '0'}
            icon={''}
          />
          <TotalBoxUser
            key={1}
            title={"Số phản hồi đang xử lý"}
            number={reportStatistic?.totalReportProcessed ? reportStatistic?.totalReportProcessed.toString() : '0'}
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