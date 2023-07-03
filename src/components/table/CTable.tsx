import { Button, DatePicker, Table } from 'antd';
import './ctable.styles.scss'

import React from 'react'
import { ColumnsType } from 'antd/lib/table';
import Input from 'antd/lib/input/Input';
const { RangePicker } = DatePicker;

interface CTableProps{
    tableMainTitle?: string;
    allowTextSearch?: true;
    allowDateRangeSearch?: true;
    titleOfColumnList?: ColumnsType<any>;
    data?: any[];
    allowActionDetail?: boolean;
    allowActionBlock?: boolean;
    onChangeInput?: (event: any) => void;
    onChangeRangePicker?: (event: any) => void;
    onSearch?: () => void;

}

const CTable = (props: CTableProps) => {

  return (
    <div className='table-main'>
        <div className='title-and-search'>
            <div className='title'>{props.tableMainTitle}</div>
            <div className='search-area'>
                {
                    props.allowTextSearch && 
                    <Input onChange={
                        (event) => {
                            if(props.onChangeInput) props.onChangeInput(event)
                        }
                    }/>
                }
                {
                    props.allowDateRangeSearch && 
                    <RangePicker 
                        onChange={(event)=> {
                            if(props.onChangeRangePicker) props.onChangeRangePicker(event)
                        }}
                    />
                }
                {
                    (props.allowDateRangeSearch ||
                    props.allowTextSearch) && 
                    <Button
                        onClick={()=>{
                            if(props.onSearch) props.onSearch()
                        }}
                    >Tìm kiếm</Button>
                }
            </div>
        </div>
        <div className='table'>
            <Table columns={props.titleOfColumnList} dataSource={props.data} />
        </div>
    </div>
  )
}

export default CTable