import { DeleteOutlined } from '@ant-design/icons'
import { Button, notification } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { IPriorityUser } from '../../common/user.interface'
import AddArchitectModal from '../../components/modal/add-architect-modal/add-architect-modal'
import { addOutTopArchitectRequest, getOutTopArchitectRequest, getTopArchitectRequest, removeOutTopArchitectRequest, saveTopArchitectRequest } from '../../redux/controller'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store'
import './homepage.styles.scss'

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

  useEffect(()=> {
    const bodyrequest = {
        size: 100,
        offset: 0
    }
    dispatch(getTopArchitectRequest(bodyrequest))
    dispatch(getOutTopArchitectRequest(bodyrequest))
  },[])

  useEffect(()=>{
    if(topArchitect){
      setPeople(topArchitect)
    }
  },[topArchitect])

  function handleSort() {
    const peopleClone = [...people]
    const temp = peopleClone[dragPerson.current]
    peopleClone[dragPerson.current] = peopleClone[draggedOverPerson.current]
    peopleClone[draggedOverPerson.current] = temp
    setPeople(peopleClone)
  }

  function handleAddArchitect(architect: IPriorityUser) {
    // people.push(architect)
    if(people.find(item => item === architect)){
      notification.open({
          message: "Trong danh sách đã có Kiến trúc sư này",
          onClick: () => {
              console.log("Notification Clicked!");
          },
      });
      return null
    }
    const peopleClone = [...people,architect]
    setPeople(peopleClone); // Lưu KTS được thêm vào list top KTS
    dispatch(removeOutTopArchitectRequest(architect)); // Xóa bỏ KTS khỏi list OutTop KTS 
  }

  function handleDelete(person: IPriorityUser) {
    const objWithIdIndex = people.findIndex((obj) => person === obj);

    if (objWithIdIndex > -1) {
      const peopleClone = [...people];
      peopleClone.splice(objWithIdIndex, 1);
      setPeople(peopleClone) // Loại bỏ KTS khỏi list top KTS
    }

    dispatch(addOutTopArchitectRequest(person)); // Thêm KTS bị xóa vào list OutTop KTS
  }

  function handleSave() {
    const bodyrequest = {
      userIds: people.map(item => item.id)
    }
    console.log(bodyrequest)
    dispatch(saveTopArchitectRequest(bodyrequest));
  }

  return (
    <main className="flex min-h-screen flex-col items-center space-y-4">
        <div className=''>
            <h1 className="text-xl font-bold mt-4">Quản lý giao diện Homepage</h1>
        </div>
        <AddArchitectModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          handleAddArchitect={handleAddArchitect}
          outTopArchitect={outTopArchitect}
        />
        <div>
          <Button
            onClick={()=>setIsOpenModal(true)}
          >
            Thêm kiến trúc sư
          </Button>
        </div>
        <div className='list'>
            {people.map((person, index) => (
                <div 
                    className="item relative flex space-x-3 border rounded p-2 bg-gray-100"
                    draggable
                    onDragStart={() => (dragPerson.current = index)}
                    onDragEnter={() => (draggedOverPerson.current = index)}
                    onDragEnd={handleSort}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <div>{person.name}</div>
                    <div onClick={() => handleDelete(person)} className='action'>
                      <DeleteOutlined />
                    </div>
                </div>
            ))}
        </div>
        <div>
          <Button
            onClick={()=>handleSave()}
          >
            Lưu thay đổi
          </Button>
        </div>
    </main>
  )
}