import React, { useEffect, useState } from 'react'
import CTable from '../../components/table/CTable'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import { blockUsersRequest, getSketchsRequest, getUsersRequest } from '../../redux/controller';
import { motion } from 'framer-motion';
import './sketch.styles.scss'
import { Space } from 'antd';
import { ColumnsType } from 'rc-table/lib/interface';
import { IGetUsersRequest, IUser } from '../../common/user.interface';
import { ColumnType } from 'antd/lib/table';
import Utils from '../../utils/base-utils';
import { QUERY_PARAM } from '../../constants/get-api.constant';
import { IGetSketchRequest, ISketch } from '../../common/sketch.interface';
const Sketch = () => {
  const {
    sketchList,
    totalSketchRecords
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
    console.log(totalSketchRecords)
  }, [totalSketchRecords])

  const columns: ColumnType<ISketch>[] = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'views',
      dataIndex: 'views',
      key: 'views',
    },
    {
      title: 'likes',
      dataIndex: 'likes',
      key: 'likes',
    },
    {
      title: 'quantityPurchased',
      dataIndex: 'quantityPurchased',
      key: 'quantityPurchased',
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
    //   {
    //     title: 'id',
    //     dataIndex: 'id',
    //     key: 'id',
    // },
    {
      title: 'image',
      key: 'image',
      render: (_, record) => (
        <Space size="middle">
          <img style={{ width: '90px' }} src={record.image} />
        </Space>
      ),
    },
    {
      title: 'nameDesignStyle',
      dataIndex: 'nameDesignStyle',
      key: 'nameDesignStyle',
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
    dispatch(getSketchsRequest(finalBody))
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
      <div>Statistic overall</div>
      <div className='table-area'>
        <CTable
          tableMainTitle='Danh sách sản phẩm'
          allowDateRangeSearch={true}
          allowTextSearch={true}
          onChangeInput={onChangeInput}
          onChangeRangePicker={onChangeRangePicker}
          onSearch={onSearch}
          data={sketchList}
          titleOfColumnList={columns}
          totalRecord={totalSketchRecords}
          onChangePagination={onChangePagination}
        />
      </div>
    </motion.div>
  )
}

export default Sketch