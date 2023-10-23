import React, { useEffect, useState } from 'react'
import CTable from '../../components/table/CTable'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import { blockSketchRequest, deleteSketchRequest, getAllStylesRequest, getSketchsRequest, getSketchsStatisticRequest, getUsersRequest } from '../../redux/controller';
import { motion } from 'framer-motion';
import './sketch.styles.scss'
import { Space } from 'antd';
import { ColumnType } from 'antd/lib/table';
import Utils from '../../utils/base-utils';
import { QUERY_PARAM } from '../../constants/get-api.constant';
import { IGetSketchRequest, IReqGetLatestSketchs, ISketch } from '../../common/sketch.interface';
import TotalBoxUser from '../../components/totalBox/TotalBoxUser';


const Sketch = () => {
  const {
    sketchList,
    totalSketchRecords,
    sketchStatistic,
    styleList,
  } = useSelectorRoot((state) => state.management);

  const [textSearch, setTextSearch] = useState('');
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('')
  const [currentSearchValue, setCurrentSearchValue] = useState<IGetSketchRequest>(
    {
      size: QUERY_PARAM.size,
      offset: 0
    }
  )


  useEffect(() => {
    const bodyrequest: IReqGetLatestSketchs = {
      size: 10,
      offset: 0,
    };
    dispatch(getSketchsStatisticRequest())
    dispatch(getAllStylesRequest(bodyrequest))
  }, [totalSketchRecords])

  const [isReponsive, setIsReponsive] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

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
  const columns: ColumnType<ISketch>[] = [
    {
      title: 'Số thứ tự',
      render: (_, __, rowIndex) => (
        <span className='span-table'>{rowIndex + 1}</span>
      )
    },
    {
      title: 'Tên tác giả',
      dataIndex: 'sellerName',
      key: 'sellerName',
      render: (_, record) => (
        <Space >
          <span>{record.seller?.name}</span>
        </Space>
      ),
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    // {
    //   title: 'Giá',
    //   dataIndex: 'price',
    //   key: 'price',
    //   render: (_, record) => (
    //     <span style={{ display: 'flex', justifyContent: 'end' }}>{Utils.formatMoney(record.price)}</span>
    //   ),
    // },
    // {
    //   title: 'Số lượng đã bán',
    //   dataIndex: 'quantityPurchased',
    //   key: 'quantityPurchased',
    // },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => (
        <Space >
          <span>{new Date(record.createdAt).toLocaleDateString('en-GB')}</span>
        </Space>
      ),
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (_, record) => (
        <Space >
          <span>{new Date(record.updatedAt).toLocaleDateString('en-GB')}</span>
        </Space>
      ),
    },
    //   {
    //     title: 'id',
    //     dataIndex: 'id',
    //     key: 'id',
    // },
    {
      title: 'Ảnh',
      key: 'image',
      render: (_, record) => (
        <Space size="middle">
          <img style={{ width: '90px' }} src={record.image} />
        </Space>
      ),
    },
    {
      title: 'Phong cách',
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
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={(event) => handleBlockSketch(record)}>Block</a>
          <a onClick={(event) => handleDeleteSketch(record)}>Delete</a>
        </Space>
      ),
    },
  ];
  const columnsReponsive: ColumnType<ISketch>[] = [
    {
      title: 'Số thứ tự',
      render: (_, __, rowIndex) => (
        <span className='span-table'>{rowIndex + 1}</span>
      )
    },
    {
      title: 'Tên tác giả',
      dataIndex: 'sellerName',
      key: 'sellerName',
      render: (_, record) => (
        <Space >
          <span>{record.seller?.name}</span>
        </Space>
      ),
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => (
        <span style={{ display: 'flex', justifyContent: 'end' }}>{Utils.formatMoney(record.price)}</span>
      ),
    },
    {
      title: 'Số lượng đã bán',
      dataIndex: 'quantityPurchased',
      key: 'quantityPurchased',
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => (
        <Space >
          <span>{new Date(record.createdAt).toLocaleDateString('en-GB')}</span>
        </Space>
      ),
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (_, record) => (
        <Space >
          <span>{new Date(record.updatedAt).toLocaleDateString('en-GB')}</span>
        </Space>
      ),
    },
    //   {
    //     title: 'id',
    //     dataIndex: 'id',
    //     key: 'id',
    // },
    {
      title: 'Ảnh',
      key: 'image',
      render: (_, record) => (
        <Space size="middle">
          <img style={{ width: '90px' }} src={record.image} />
        </Space>
      ),
    },
    {
      title: 'Phong cách',
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
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={(event) => handleBlockSketch(record)}>Block</a>
          <a onClick={(event) => handleDeleteSketch(record)}>Delete</a>
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

  useEffect(() => {
    dispatch(getSketchsRequest(currentSearchValue))

  }, [])

  const dispatch = useDispatchRoot()

  const handleBlockSketch = (record: any) => {
    const bodyrequest = {
      sketchId: record.id,
      currentSearchValue: currentSearchValue
    }
    dispatch(blockSketchRequest(bodyrequest));
  }

  const handleDeleteSketch = (record: any) => {
    const bodyrequest = {
      productId: record.id,
      currentSearchValue: currentSearchValue
    }
    dispatch(deleteSketchRequest(bodyrequest));
  }

  const onChangeInput = (event: any) => {
    setTextSearch(event.target.value);
  }

  const onChangeSelectBox = (event: any) => {
    console.log(event)
    setSelectedStyle(event)
  }

  const onChangeRangePicker = (event: any) => {
    if (event) {
      setBeginDate(event[0].format('YYYY-MM-DD'))
      setEndDate(event[1].format('YYYY-MM-DD'))
    }
  }

  const onSearch = () => {
    const body: IGetSketchRequest = {
      size: QUERY_PARAM.size,
      offset: 0,
      search: textSearch,
      startTime: beginDate,
      endTime: endDate,
      status: '',
      sortBy: '',
      sortOrder: '',
      typeId: selectedStyle,
    };
    console.log(body)

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
      <div>
        <div className="statistical-user">
          <TotalBoxUser
            key={0}
            title={"Tổng số bản vẽ toàn sàn"}
            number={sketchStatistic?.totalProduct ? sketchStatistic?.totalProduct.toString() : '0'}
            icon={''}
          />
          <TotalBoxUser
            key={1}
            title={"Tổng số bản vẽ mới"}
            number={sketchStatistic?.totalProductNew ? sketchStatistic?.totalProductNew.toString() : '0'}
            icon={''}
          />
        </div>
      </div>
      <div className='table-area'>
        <CTable
          tableMainTitle='Danh sách sản phẩm'
          allowDateRangeSearch={true}
          allowTextSearch={true}
          allowSelectBox={true}
          onChangeSelectBox={onChangeSelectBox}
          selectBoxPlaceholder="Chọn kiểu kiến trúc"
          selectBoxData={styleList}
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