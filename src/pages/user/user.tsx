import React, { useState } from 'react'
import CTable from '../../components/table/CTable'
import { useDispatchRoot } from '../../redux/store';
import { getUsersRequest } from '../../redux/controller';

const User = () => {

    const [textSearch, setTextSearch] = useState('');
    const [beginDate, setBeginDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const dispatch = useDispatchRoot()

    const onChangeInput = (event: any) => {
        setTextSearch(event.target.value);
    }

    const onChangeRangePicker = (event: any) => {
        console.log(event)
    }

    const onSearch = () => {
        console.log('hehee')
        const body: any = {
            size: 20,
            offset: 0
        };
        dispatch(getUsersRequest(body))
    }

  return (
    <div className='user-main'>
        <div>Statistic overall</div>
        <div className='table-area'>
            <CTable
                tableMainTitle='Danh sách tài khoản'
                allowDateRangeSearch = {true}
                allowTextSearch = {true}
                onChangeInput={onChangeInput}
                onChangeRangePicker={onChangeRangePicker}
                onSearch={onSearch}
            />
        </div>
    </div>
  )
}

export default User