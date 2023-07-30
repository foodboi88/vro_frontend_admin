import { Button, Divider, Form, Input, Modal, Space } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { IGetSketchRequest } from '../../common/sketch.interface';
import CTable from '../../components/table/CTable';
import { QUERY_PARAM } from '../../constants/get-api.constant';
import { approveSellerRequest, approveWithdrawRequest, getSellerRequests, getWithdrawRequests } from '../../redux/controller';
import { useSelectorRoot, useDispatchRoot } from '../../redux/store';
import Utils from '../../utils/base-utils';
import { IGetWithdrawsRequest, IWithdrawRequest } from '../../common/withdraw-request.interface';
import './withdraw-request.styles.scss';
import form from 'antd/lib/form';

const WithdrawRequest = () => {
  const {
    withdrawRequestList,
    totalWithdrawRequestRecord,
  } = useSelectorRoot((state) => state.management);

  const [textSearch, setTextSearch] = useState('');
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [openModalApprove, setOpenModalApprove] = useState(false);
  const [openModalReject, setOpenModalReject] = useState(false);
  const [bankId, setBankId] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [amount, setAmount] = useState(0);
  const [receiverName, setReceiverName] = useState('');
  const [withdrawId, setWithdrawId] = useState('');
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openDetailModal,setOpenDetailModal] = useState(false);
  const [detailBill,setDetailBill] = useState<IWithdrawRequest>();

  const [currentSearchValue, setCurrentSearchValue] = useState<IGetSketchRequest>(
    {
      size: QUERY_PARAM.size,
      offset: 0
    }
  )

  const [form] = Form.useForm();




  const columns: ColumnType<IWithdrawRequest>[] = [
    // {
    //     title: 'Tình trạng',
    //     dataIndex: 'status',
    //     key: 'status'
    //   },
    {
      title: 'Số thứ tự',
      render: (_, __, rowIndex) => (
        <span className='span-table'>{rowIndex + 1}</span>
      )
    },
    {
      title: 'Mã yêu cầu',
      dataIndex: 'withdrawalCode',
      key: 'withdrawalCode',
    },
    {
      title: 'Tình trạng xử lý',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        if (record.status === "APPROVED") {
          return (<span>Đã chuyển</span>)
        }
        else if(record.status === "REJECTED") {
          return (<span>Từ chối</span>)
        }
        else {
          return (<span>Chưa chuyển</span>)
        }
      }
    },
    {
      title: 'Lượng tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (_, record) => (
        <span style={{ display: 'flex', justifyContent: 'end' }}>{Utils.formatMoney(record.amount)} đ</span>
      )
    },
    {
      title: 'Thời gian tạo yêu cầu',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => (
        <span>{new Date(record.createdAt).toLocaleDateString('en-GB')}</span>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={(event) => handleOpenDetail(record)}>Xử lý yêu cầu</a>
          {/* <a onClick={(event) => handleOpenRejected(record)}>Từ chối</a> */}
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
    dispatch(getWithdrawRequests(currentSearchValue))

  }, [])

  const dispatch = useDispatchRoot()

  const saveBodyrequest = (record: IWithdrawRequest) => {
    setDetailBill(record)
    setBankId(record.bankName);
    setAccountNo(record.bankAccountNumber);
    setAmount(record.amount);
    setReceiverName(record.name);
    setWithdrawId(record.id)
  }

  // const handleOpenApprove = (record: IWithdrawRequest) => {
  //   setOpenModalApprove(true);
  //   saveBodyrequest(record)
  // }

  // const handleOpenRejected = (record: IWithdrawRequest) => {
  //   saveBodyrequest(record)

  // }

  const handleOpenDetail = (record: IWithdrawRequest) => {
    saveBodyrequest(record)
    setOpenDetailModal(true);
  }

  const handleApprove = () => {

    const bodyrequest = {
      id: withdrawId,
      status: "APPROVED",
      processedComment: "Đã chấp nhận yêu cầu",
      currentSearchValue: currentSearchValue,

    }
    dispatch(approveWithdrawRequest(bodyrequest));
    setOpenModalApprove(false)
    setOpenDetailModal(false)
  }

  const handleReject = () => {

    const bodyrequest = {
      id: withdrawId,
      status: "REJECTED",
      processedComment: "Đã từ chối yêu cầu",
      currentSearchValue: currentSearchValue
    }
    dispatch(approveWithdrawRequest(bodyrequest));
    setOpenDetailModal(false)

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
    const body: IGetWithdrawsRequest = {
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
    dispatch(getWithdrawRequests(finalBody))
  }

  const onChangePagination = (event: any) => {
    currentSearchValue.offset = (event - 1) * QUERY_PARAM.size;
    setCurrentSearchValue(currentSearchValue);
    dispatch(getWithdrawRequests(currentSearchValue))
  }

  return (
    <motion.div className='withdraw-main'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      {
        openDetailModal && detailBill &&
        <div className='approve-request-modal'>
          <Modal
            open={openDetailModal}
            title={"Xử lý yêu cầu rút tiền"}
            closable={true}
            onCancel={() => setOpenDetailModal(false)}
            footer={false}
          >

            <Form
              name="basic"
              form={form}

              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={detailBill}
              // onFinish={handleCreate}
              autoComplete="off"
            >
              <Form.Item
                label="Trạng thái"
                name="status"
                
              >
                <Input readOnly={true}/>
              </Form.Item>

              <Form.Item
                label="Mã yêu cầu"
                name="withdrawalCode"
              >
                <Input readOnly={true}/>
              </Form.Item>

              <Form.Item
                label="Lượng tiền"
                name="amount"
              >
                <Input readOnly={true}/>
              </Form.Item>

              <Form.Item
                label="Thời gian tạo"
                name="createdAt"
              >
                <Input readOnly={true}/>
              </Form.Item>

              <Form.Item
                label="Ghi chú của admin"
                name="processedComment"
              >
                <Input readOnly={true}/>
              </Form.Item>

              <Divider>Thông tin người rút</Divider>

              <Form.Item
                label="Tên cá nhân/tổ chức"
                name="name"
              >
                <Input readOnly={true}/>
              </Form.Item>

              <Form.Item
                label="Địa chỉ"
                name="address"
              >
                <Input readOnly={true}/>
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                name="phone"
              >
                <Input readOnly={true}/>
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
              >
                <Input readOnly={true}/>
              </Form.Item>

              <Form.Item
                label="Loại tài khoản"
                name="sellerType"
              >
                <Input readOnly={true}/>
              </Form.Item>

              <Form.Item
                label="Mã số thuế"
                name="taxCode"
              >
                <Input readOnly={true}/>
              </Form.Item>

              <Form.Item
                label="Số tài khoản"
                name="bankAccountNumber"
              >
                <Input readOnly={true}/>
              </Form.Item>

              <Form.Item
                label="Ngân hàng"
                name="bankName"
              >
                <Input readOnly={true}/>
              </Form.Item>

              <Form.Item
                label="Chi nhánh"
                name="bankBranch"
              >
                <Input readOnly={true}/>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                
                  <Button style={{marginRight: '15px'}} type="primary" onClick={() => {
                    setOpenModalApprove(true);
                  }}>Chấp nhận</Button>

                  <Button type="default" onClick={() => {
                    handleReject()
                  }}>Từ chối</Button>

              </Form.Item>
              
            </Form>

          </Modal>
        </div>
      }
      {
        bankId && receiverName && accountNo && amount && openModalApprove &&
        <div className='approve-request-modal'>
          <Modal
            open={openModalApprove}
            onOk={handleApprove}
            okText={'Đã chuyển tiền'}
            cancelText={'Hủy'}
            closable={true}
            onCancel={() => setOpenModalApprove(false)}
          >
            <img src={`https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?amount=${amount}&addInfo=thanh%toan%tien&accountName=${receiverName}`} />
          </Modal>
        </div>
      }
      {/* {
        bankId && receiverName && accountNo && amount && openModalReject &&
        <div className='approve-request-modal'>
          <Modal
            open={openModalReject}
            onOk={handleReject}
            okText={'Xác nhận'}
            cancelText={'Hủy'}
            closable={true}
            onCancel={() => setOpenModalReject(false)}
          >
            <span>Bạn có chắc chắn muốn từ chối yêu cầu này?</span>
          </Modal>
        </div>
      } */}
      <div className='table-area'>
        <CTable
          tableMainTitle='Danh sách yêu cầu rút tiền'
          allowDateRangeSearch={true}
          allowTextSearch={true}
          onChangeInput={onChangeInput}
          onChangeRangePicker={onChangeRangePicker}
          onSearch={onSearch}
          data={withdrawRequestList}
          titleOfColumnList={columns}
          totalRecord={totalWithdrawRequestRecord}
          onChangePagination={onChangePagination}
        />
      </div>
    </motion.div>
  )
}

export default WithdrawRequest