import { Divider, Modal, Space } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IBuyerDemandInterface } from '../../common/buyer-demand.interface';
import { IGetSketchRequest } from '../../common/sketch.interface';
import { IGetUsersRequest } from '../../common/user.interface';
import CTable from '../../components/table/CTable';
import { QUERY_PARAM } from '../../constants/get-api.constant';
import { approveDemandRequests, approveSellerRequest, getSellerRequests, getUploadDemandRequests } from '../../redux/controller';
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import Utils from '../../utils/base-utils';
import './buyer-demand.styles.scss';
const BuyerDemand = () => {
  const { uploadDemandRequest, uploadDemandCount } = useSelectorRoot((state) => state.management);
    const [textSearch, setTextSearch] = useState('');
    const [beginDate, setBeginDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentSearchValue, setCurrentSearchValue] = useState<IGetSketchRequest>({ size: QUERY_PARAM.size, offset: 0 })
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [detailUser, setDetailUser] = useState<IBuyerDemandInterface>();
    const columns: ColumnType<IBuyerDemandInterface>[] = [
        {
            title: 'Số thứ tự',
            render: (_, __, rowIndex) => (
                <span className='span-table'>{rowIndex + 1}</span>
            )
        },
        {
            title: 'Tên người mua',
            dataIndex: 'userName',
            key: 'name',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'userPhone',
            key: 'userPhone',
            render: (_, record) => (
                <p>{Utils.formatPhoneNumber(record.userPhone)}</p>
            )


        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Tình trạng',
            dataIndex: 'isApproved',
            key: 'isApproved',
            render: (_, record) => {
                if (record.isApproved) return (
                    <Space size="middle">
                        <span>Đã duyệt</span>
                    </Space>
                )
                else return (
                    <Space size="middle">
                        <span>Chưa duyệt</span>
                    </Space>
                )
            },
        },
        {
            title: 'Thời gian tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_, record) => (
                <Space size="middle">
                    <span>{new Date(record.createdAt).toLocaleDateString('en-GB')}</span>
                </Space>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {!record.isApproved && <a onClick={(event) => handleApprove(record)}>Chấp nhận</a>}
                    <a onClick={(event) => handleViewDetail(record)}>Chi tiết</a>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        dispatch(getUploadDemandRequests(currentSearchValue))

    }, [])

    const dispatch = useDispatchRoot()

    const handleApprove = (record: any) => {
        const bodyrequest = {
            currentSearchValue,
            id: record.id
        }
        dispatch(approveDemandRequests(bodyrequest));
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
        currentSearchValue.offset = (event.page - 1) * QUERY_PARAM.size;
        setCurrentSearchValue(currentSearchValue);
        dispatch(getUploadDemandRequests(currentSearchValue))
    }

    const handleViewDetail = (record: any) => {
        setIsOpenModal(!isOpenModal);
        setDetailUser(record);
    }

    return (
        <motion.div className='user-main'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>

            {
                isOpenModal && detailUser &&
                <Modal
                    open={isOpenModal}
                    onOk={() => setIsOpenModal(false)}
                    okText={'Xác nhận'}
                    cancelText={'Đóng'}
                    closable={true}
                    onCancel={() => setIsOpenModal(false)}
                    title={'Chi tiết nhu cầu'}
                    className='modal-detail-bill'
                    footer={false}
                >
                    <div>
                        <Divider>Thông tin người mua</Divider>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Tên:</div>
                                <div>{detailUser.userName}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Email:</div>
                                <div>{detailUser.email}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Số điện thoại:</div>
                                <div>{detailUser.userPhone}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Tạo lúc:</div>
                                <div>{new Date(detailUser.createdAt).toLocaleDateString('en-GB')}</div>
                            </div>
                        </div>

                        <Divider>Thông tin nhu cầu</Divider>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Tiêu đề:</div>
                                <div>{detailUser.title}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 87 }}>
                                <div>Mô tả:</div>
                                <div>{detailUser.description}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Tình trạng:</div>
                                <div>{(detailUser.isApproved) ? (
                                          <Space size="middle">
                                              <span>Duyệt</span>
                                          </Space>
                                      )
                                    :  (
                                      <Space size="middle">
                                          <span>Chưa duyệt</span>
                                      </Space>
                                  )}</div>
                            </div>
                        </div>
                    </div>
                </Modal>
            }
            <div className='table-area'>
                <CTable
                    tableMainTitle='Danh sách nhu cầu khách hàng'
                    // allowDateRangeSearch={true}
                    // allowTextSearch={true}
                    onChangeInput={onChangeInput}
                    onChangeRangePicker={onChangeRangePicker}
                    // onSearch={onSearch}
                    data={uploadDemandRequest}
                    titleOfColumnList={columns}
                    totalRecord={uploadDemandCount}
                    onChangePagination={onChangePagination}
                />
            </div>
        </motion.div>
    )
}

export default BuyerDemand