import { DatePicker, Table } from 'antd';
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
}

const CTable = (props: CTableProps) => {

  return (
    <div className='table-main'>
        <div className='title-and-search'>
            <div className='title'>{props.tableMainTitle}</div>
            <div className='search-area'>
                {
                    props.allowTextSearch && 
                    <Input/>
                }
                {
                    props.allowDateRangeSearch && 
                    <RangePicker />
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