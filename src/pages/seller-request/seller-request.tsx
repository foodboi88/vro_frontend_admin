import { Divider, Modal, Space } from 'antd';
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
import './seller-request.styles.scss'
const SellerRequest = () => {
    const { sellerRequestList, numberOfSellerRequest } = useSelectorRoot((state) => state.management);
    const [textSearch, setTextSearch] = useState('');
    const [beginDate, setBeginDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentSearchValue, setCurrentSearchValue] = useState<IGetSketchRequest>({ size: QUERY_PARAM.size, offset: 0 })
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [detailUser, setDetailUser] = useState<ISellerRequest>();
    const columns: ColumnType<ISellerRequest>[] = [
        {
            title: 'Số thứ tự',
            render: (_, __, rowIndex) => (
                <span className='span-table'>{rowIndex + 1}</span>
            )
        },
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
            render: (_, record) => (
                <p>{Utils.formatPhoneNumber(record.phone)}</p>
            )
            

        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        // {
        //     title: 'CCCD',
        //     dataIndex: 'identityCardNumber',
        //     key: 'identityCardNumber',
        // },
        // {
        //     title: 'Mã số thuế',
        //     dataIndex: 'vatCode',
        //     key: 'vatCode',
        // },
        // {
        //     title: 'Số tài khoản',
        //     dataIndex: 'bankAccountNumber',
        //     key: 'bankAccountNumber',
        // },
        // {
        //     title: 'Ngân hàng',
        //     dataIndex: 'bankName',
        //     key: 'bankName',
        // },
        // {
        //     title: 'Chi nhánh ngân hàng',
        //     dataIndex: 'bankBranch',
        //     key: 'bankBranch',
        // },
        {
            title: 'Tình trạng',
            dataIndex: 'isApproved',
            key: 'isApproved',
            render: (_, record) => {
                if (record.isApproved) return (
                    <Space size="middle">
                        <span>Duyệt</span>
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
                    <a onClick={(event) => handleApprove(record)}>Chấp nhận</a>
                    <a onClick={(event) => handleViewDetail(record)}>Chi tiết</a>
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
        dispatch(getSellerRequests(currentSearchValue))

    }, [])

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

    const handleViewDetail = (record: any) => {
        setIsOpenModal(!isOpenModal);
        setDetailUser(record);
    }

    return (
        <motion.div className='sketch-main'
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
                    title={'Chi tiết người dùng'}
                    className='modal-detail-bill'
                    footer={false}
                >
                    <div>
                        <Divider>Thông tin cá nhân</Divider>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Tên người dùng:</div>
                                <div>{detailUser.name}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Email:</div>
                                <div>{detailUser.email}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Số điện thoại:</div>
                                <div>{detailUser.phone}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Địa chỉ:</div>
                                <div>{detailUser.address}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Căn cước công dân:</div>
                                <div>{detailUser.identityCardNumber}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Mã số thuế:</div>
                                <div>{detailUser.vatCode}</div>
                            </div>
                        </div>

                        <Divider>Thông tin ngân hàng</Divider>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Tên ngân hàng:</div>
                                <div>{detailUser.bankName}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Chi nhánh ngân hàng:</div>
                                <div>{detailUser.bankBranch}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Số tài khoản:</div>
                                <div>{detailUser.bankAccountNumber}</div>
                            </div>
                        </div>
                    </div>
                </Modal>
            }
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