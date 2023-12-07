import Modal from 'antd/lib/modal/Modal'
import React from 'react'

interface MyProps {
    isOpenModal: boolean,
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    handleAddArchitect: (architect: any) => void,
    outTopArchitect: any[]
}

const AddArchitectModal = (props: MyProps) => {

    const handleClickArchitect = (architect: any) => {
        props.handleAddArchitect(architect)
        props.setIsOpenModal(false);
    }

  return (
    <div>
        <Modal
            open={props.isOpenModal}
            closable={true}
            onCancel={() => props.setIsOpenModal(false)}
            footer={null}

        >
            <div>
                {
                    props.outTopArchitect.map(item => 
                        <div onClick={()=> handleClickArchitect(item)}>{item.name}</div>
                    )
                }
            </div>
        </Modal>
    </div>
  )
}

export default AddArchitectModal