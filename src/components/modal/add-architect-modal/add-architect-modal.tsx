import { Checkbox, Input, Radio, Table, Modal } from 'antd'
import React, { useState } from 'react'
import './style.add-architect-modal.scss'
interface MyProps {
    isOpenModal: boolean,
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    handleAddArchitect: (architect: any) => void,
    outTopArchitect: any[]
}

const AddArchitectModal = (props: MyProps) => {
    const columns = [
        {
            title: 'Select',
            dataIndex: 'select',
            render: (_: any, item: any) => (
                <Checkbox onChange={() => handleClickArchitect(item)} />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
    ];
    const [searchValue, setSearchValue] = useState<string>('');

    const filteredMembers = props.outTopArchitect.filter((member) =>
        member.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleClickArchitect = (architect: any) => {
        // Modal.confirm({
        //     className: 'modal-confirm',
        //     title: 'Thêm thành viên',
        //     content: `Bạn có muốn thêm ${architect.name} vào danh sách không?`,
        //     okText: 'Xác nhận',
        //     cancelText: 'Hủy bỏ',
        //     onOk: () => {
        //         props.handleAddArchitect(architect);
        //         props.setIsOpenModal(false);
        //     },
        //     onCancel: () => {
        //         props.setIsOpenModal(false);
        //     },
        // });
        props.handleAddArchitect(architect)
        props.setIsOpenModal(false);
    }

    return (
        <Modal
            title="Thêm thành viên"
            visible={props.isOpenModal}
            onCancel={() => props.setIsOpenModal(false)}
            footer={null}
            className='add-architect-modal'
        >
            <Input.Search
                placeholder="Tìm kiếm thành viên"
                onChange={value => setSearchValue(value.target.value)}
                style={{ marginBottom: '1em' }}
            />

            <Table
                rowKey="id"
                columns={columns}
                dataSource={filteredMembers}
                pagination={false}
                showHeader={false}
            />
        </Modal>
    )
}

export default AddArchitectModal