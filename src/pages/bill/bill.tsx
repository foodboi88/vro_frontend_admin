import { Divider, Space } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { IReport } from '../../common/report.interface';
import { IGetSketchRequest } from '../../common/sketch.interface';
import CTable from '../../components/table/CTable';
import { QUERY_PARAM } from '../../constants/get-api.constant';
import { getReportsStatisticRequest, blockUsersRequest, getReportsRequest, getSketchsRequest, getBillListRequests, getDetailBillRequests } from '../../redux/controller';
import { useSelectorRoot, useDispatchRoot } from '../../redux/store';
import Utils from '../../utils/base-utils';
import Modal from 'antd/lib/modal/Modal';
import './bill.styles.scss'
import { IGetBillsRequest } from '../../common/bill.interface';
const Bill = () => {
    const {
        totalBillRecord,
        billList,
        detailBill
    } = useSelectorRoot((state) => state.management);
    const [openModal, setOpenModal] = useState(false);
    const [textSearch, setTextSearch] = useState('');
    const [beginDate, setBeginDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentSearchValue, setCurrentSearchValue] = useState<IGetSketchRequest>(
        {
            size: QUERY_PARAM.size,
            offset: 0
        }
    )
    const columns: ColumnType<IReport>[] = [
        {
            title: 'Số thứ tự',
            render: (_, __, rowIndex) => (
                <span className='span-table'>{rowIndex + 1}</span>
            )
        },
        {
            title: 'Mã đơn hàng',
            dataIndex: 'orderId',
            key: 'orderId',
            render: (_, record) => (
                <Space >
                    <span style={{ fontSize: 13 }}>{record.orderId}</span>
                </Space>
            )
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Tạo lúc',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_, record) => (
                <Space >
                    <span>{new Date(record.createdAt).toLocaleDateString('en-GB')}</span>
                </Space>
            ),
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            key: 'total',
            render: (_, record) => (
                    <span style={{ display: 'flex', justifyContent: 'end' }}>{Utils.formatMoney(record.total)}</span>
            ),
        },
        {
            title: 'Tổng sản phẩm',
            dataIndex: 'totalProduct',
            key: 'totalProduct',
            render: (_, record) => (
                <Space >
                    <span>{record.totalProduct}</span>
                </Space>
            ),
        },
        // {
        //     title: 'Trạng thái',
        //     dataIndex: 'status',
        //     key: 'status',
        //     render: (_, record) => {
        //         if (record.status) {
        //             return (<span>Đã hoàn thành</span>)
        //         }
        //         else {
        //             return (<span>Chưa hoàn thành</span>)
        //         }
        //     }
        // },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentMethods',
            key: 'paymentMethods',
            render: (_, record) => (
                <span >{record.paymentMethods}</span>
            )
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={(event) => handleDetail(record)}>Chi tiết</a>
                </Space>
            ),
        },
    ];


    useEffect(() => {
        dispatch(getBillListRequests(currentSearchValue));

    }, [])

    const dispatch = useDispatchRoot()

    const handleDetail = (record: any) => {
        const bodyrequest = {
            id: record.id,
            //   currentSearchValue: currentSearchValue
        }
        dispatch(getDetailBillRequests(bodyrequest));
        setOpenModal(true)
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
        const body: IGetBillsRequest = {
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
        dispatch(getBillListRequests(finalBody))
    }

    const onChangePagination = (event: any) => {
        currentSearchValue.offset = (event - 1) * QUERY_PARAM.size;
        setCurrentSearchValue(currentSearchValue);
        dispatch(getBillListRequests(currentSearchValue))
    }

    return (
        <motion.div className='sketch-main'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            {
                detailBill && openModal &&
                <Modal
                    open={openModal}
                    onOk={() => setOpenModal(false)}
                    okText={'Xác nhận'}
                    cancelText={'Đóng'}
                    closable={true}
                    onCancel={() => setOpenModal(false)}
                    title={'Chi tiết đơn hàng'}
                    className='modal-detail-bill'
                    footer={false}
                >
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Tổng tiền:</div>
                            <div>{Utils.formatMoneyToVnd(detailBill.total)}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Tạo lúc: </div>
                            <div>{new Date(detailBill.createdAt).toLocaleDateString('en-GB')}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Mã đơn hàng:</div>
                            <div>{detailBill.orderId}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Hình thức thanh toán:</div>
                            <div>{detailBill.paymentMethods}</div>
                        </div>
                        <Divider>Thông tin người mua</Divider>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Email:</div>
                                <div>{detailBill.user.email}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Tên:</div>
                                <div>{detailBill.user.name}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Địa chỉ:</div>
                                <div>{detailBill.user.address}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Số điện thoại:</div>
                                <div>{detailBill.user.phone}</div>
                            </div>
                        </div>
                        <Divider>Danh sách sản phẩm</Divider>
                        <div style={{ padding: '10px' }}>
                            {detailBill.products.map((item: any, index: number) => {
                                return (
                                    <div style={{ marginBottom: "30px" }}>
                                        <div><b>Sản phẩm {index + 1}:</b>

                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Tiêu đề:</div>
                                                <div>{item.title}</div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Giá:</div>
                                                <div>{Utils.formatMoneyToVnd(item.price)}</div></div>
                                            <div>
                                                <img style={{ width: "200px" }} src={item.image} />
                                            </div>
                                        </div>
                                        <div>Người bán:
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Email:</div>
                                                <div>{item.seller.email}</div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Tên:</div>
                                                <div>{item.seller.name}</div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Địa chỉ:</div>
                                                <div>{item.seller.address}</div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Số điện thoại:</div>
                                                <div>{item.seller.phone}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </Modal>
            }
            <div className='table-area bill'>
                <CTable
                    tableMainTitle='Danh sách đơn hàng'
                    allowDateRangeSearch={true}
                    allowTextSearch={true}
                    onChangeInput={onChangeInput}
                    onChangeRangePicker={onChangeRangePicker}
                    onSearch={onSearch}
                    data={billList}
                    titleOfColumnList={columns}
                    totalRecord={totalBillRecord}
                    onChangePagination={onChangePagination}
                />
            </div>
        </motion.div>
    )
}

export default Bill



