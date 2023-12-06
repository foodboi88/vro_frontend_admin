import { useEffect, useRef, useState } from 'react'
import './homepage.styles.scss'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store'
import { getOutTopArchitectRequest, getTopArchitectRequest } from '../../redux/controller'
import { Button, notification } from 'antd'
import AddArchitectModal from '../../components/modal/add-architect-modal/add-architect-modal'
import { DeleteOutlined } from '@ant-design/icons'

export default function HomePage() {
    const dispatch = useDispatchRoot()
    const {
      topArchitect,
      outTopArchitect
    } = useSelectorRoot((state) => state.management);
  const [people, setPeople] = useState<any[]>([]);
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

  function handleAddArchitect(architect: any) {
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
    setPeople(peopleClone);
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
                    <div className='action'>
                      <DeleteOutlined />
                    </div>
                </div>
            ))}
        </div>
        <div>
          <Button
            onClick={()=>setIsOpenModal(true)}
          >
            Lưu
          </Button>
        </div>
    </main>
  )
}