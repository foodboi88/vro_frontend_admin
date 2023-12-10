import { DeleteOutlined } from '@ant-design/icons'
import { Button, Modal, notification, Table, Tooltip } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { IPriorityUser } from '../../common/user.interface'
import AddArchitectModal from '../../components/modal/add-architect-modal/add-architect-modal'
import { addOutTopArchitectRequest, getOutTopArchitectRequest, getTopArchitectRequest, removeOutTopArchitectRequest, saveTopArchitectRequest } from '../../redux/controller'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store'
import './homepage.styles.scss'
import { motion } from 'framer-motion'
import { AiOutlineDelete, AiOutlineMenu } from "react-icons/ai";


export default function HomePage() {
    const dispatch = useDispatchRoot()
    const {
        topArchitect,
        outTopArchitect
    } = useSelectorRoot((state) => state.management);
    const [people, setPeople] = useState<IPriorityUser[]>([]);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const dragPerson = useRef<number>(0)
    const draggedOverPerson = useRef<number>(0)

    useEffect(() => {
        const bodyrequest = {
            size: 100,
            offset: 0
        }
        dispatch(getTopArchitectRequest(bodyrequest))
        dispatch(getOutTopArchitectRequest(bodyrequest))
    }, [])

    useEffect(() => {
        if (topArchitect) {
            setPeople(topArchitect)
        }
    }, [topArchitect])

    function handleSort(e: any) {
        e.preventDefault();

        Modal.confirm({
            // Đổi title thành, bạn có muốn đổi vị trí của kts này từ vị trí x sang vị trí y không?
            className: 'modal-confirm',
            title: `Bạn có muốn đổi vị trí của kts này từ vị trí ${dragPerson.current + 1} sang vị trí ${draggedOverPerson.current + 1} không?`,
            okText: 'Xác nhận',
            cancelText: 'Hủy bỏ',
            onOk() {
                // // Code to change the position of the person goes here

                const peopleClone = [...people]
                const temp = peopleClone[dragPerson.current]
                peopleClone[dragPerson.current] = peopleClone[draggedOverPerson.current]
                peopleClone[draggedOverPerson.current] = temp
                setPeople(peopleClone)

                // Thực hiện hàm lưu thay đổi vị trí
                const bodyrequest = {
                    userIds: peopleClone.map(item => item.id)
                }
                dispatch(saveTopArchitectRequest(bodyrequest));

                // Sau khi thay đổi vị trí thành công, hiển thị thông báo
                notification.open({
                    message: "Thay đổi vị trí thành công",
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                });


            },
        });

    }

    function handleAddArchitect(architect: IPriorityUser) {
        // people.push(architect)
        if (people.find(item => item === architect)) {
            notification.open({
                message: "Trong danh sách đã có Kiến trúc sư này",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            return null
        }
        const peopleClone = [...people, architect]
        setPeople(peopleClone); // Lưu KTS được thêm vào list top KTS
        dispatch(removeOutTopArchitectRequest(architect)); // Xóa bỏ KTS khỏi list OutTop KTS 
    }

    function handleDelete(person: IPriorityUser) {
        Modal.confirm({
            className: 'modal-confirm',
            title: 'Bạn có chắc muốn xóa kts này?',
            okText: 'Xác nhận',
            cancelText: 'Hủy bỏ',
            onOk() {
                // Code to delete the person goes here
                const objWithIdIndex = people.findIndex((obj) => person === obj);

                if (objWithIdIndex > -1) {
                    const peopleClone = [...people];
                    peopleClone.splice(objWithIdIndex, 1);
                    setPeople(peopleClone) // Loại bỏ KTS khỏi list top KTS
                }

                dispatch(addOutTopArchitectRequest(person)); // Thêm KTS bị xóa vào list OutTop KTS

                // Sau khi xóa thành công, hiển thị thông báo
                notification.open({
                    message: "Xóa thành công",
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                });
            },
        });

    }

    function handleSave() {
        const bodyrequest = {
            userIds: people.map(item => item.id)
        }
        console.log(bodyrequest)
        dispatch(saveTopArchitectRequest(bodyrequest));

        // Sau khi lưu thành công, hiển thị thông báo
        notification.open({
            message: "Lưu thành công",
            onClick: () => {
                console.log("Notification Clicked!");
            },
        });
    }

    return (
        <motion.div
            className="main-homepage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className='action-main-home'>
                <h1 className="title">Quản lý Top 10</h1>
                <Button
                    className='btn-add'
                    onClick={() => setIsOpenModal(true)}
                >
                    Thêm kiến trúc sư
                </Button>

            </div>
            <div className='list'>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>STT</th>
                            <th>Tên kiến trúc sư</th>
                            <th>Gmail</th>
                            <th>Số điện thoại</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map((person, index) => (
                            <tr
                            >
                                <td className="drag-icon"
                                    draggable
                                    onDragStart={() => (dragPerson.current = index)}
                                    onDragEnter={() => (draggedOverPerson.current = index)}
                                    onDragEnd={handleSort}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    <Tooltip title="Kéo thả để thay đổi vị trí">
                                        <AiOutlineMenu />
                                    </Tooltip>
                                </td>
                                <td>{index + 1}</td>
                                <td>{person.name}</td>
                                <td>{person.email}</td>
                                <td>{person.phone}</td>
                                <td onClick={() => handleDelete(person)} className='action'>
                                    <div className='icon'>
                                        <Tooltip title="Xóa kts">
                                            <DeleteOutlined />
                                        </Tooltip>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='btn-save'>
                <Button
                    onClick={handleSave}
                >
                    Lưu thay đổi
                </Button>
            </div>
            <AddArchitectModal
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                handleAddArchitect={handleAddArchitect}
                outTopArchitect={outTopArchitect}
            />
        </motion.div>
    )
}