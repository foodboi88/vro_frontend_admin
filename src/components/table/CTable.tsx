import { Button, DatePicker, Select, Table } from 'antd';
import './ctable.styles.scss'

import React, { useEffect } from 'react'
import { ColumnsType } from 'antd/lib/table';
import Input from 'antd/lib/input/Input';
const { RangePicker } = DatePicker;

interface CTableProps {
    tableMainTitle?: string;
    allowTextSearch?: boolean;
    allowDateRangeSearch?: boolean;
    allowSelectBox?: boolean;
    selectBoxData?: any;
    selectBoxPlaceholder?: string;
    titleOfColumnList?: ColumnsType<any>;
    data?: any[];
    allowActionDetail?: boolean;
    allowActionBlock?: boolean;
    totalRecord: number;
    onChangeInput?: (event: any) => void;
    onChangeRangePicker?: (event: any) => void;
    onChangeSelectBox?: (event:any) => void;
    onSearch?: () => void;
    onChangePagination: (event: any) => void;

}

const CTable = (props: CTableProps) => {
    useEffect(() => {
        console.log(Math.ceil(props?.totalRecord))

        console.log(Math.ceil(props?.totalRecord / 10))
    }, [])
    return (
        <div className='table-main'>
            <div className='title-and-search'>
                <div className='title'>{props.tableMainTitle}</div>
                {/* <div className='total'>Tổng số bản ghi: {props.totalRecord}</div> */}
                <div className='search-area'>
                    {
                        props.allowTextSearch &&
                        <Input onChange={
                            (event) => {
                                if (props.onChangeInput) props.onChangeInput(event)
                            }
                        } />
                    }
                    {
                        props.allowDateRangeSearch &&
                        <RangePicker
                            onChange={(event) => {
                                if (props.onChangeRangePicker) props.onChangeRangePicker(event)
                            }}
                        />
                    }
                    {
                        props.allowSelectBox && 
                        <Select
                            // showSearch
                            // filterOption={(input, option) =>
                            //     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            // }
                            placeholder={props.selectBoxPlaceholder}
                            onChange={(event)=>{
                                if(props.onChangeSelectBox) props.onChangeSelectBox(event)
                            }}
                            options={props.selectBoxData}
                        />
                    }
                    {
                        (props.allowDateRangeSearch ||
                            props.allowTextSearch) &&
                        <Button
                            onClick={() => {
                                if (props.onSearch) props.onSearch()
                            }}
                        >Tìm kiếm</Button>
                    }
                </div>
            </div>
            <div className='table'>
                <Table
                    scroll={{ y: 350 }}
                    columns={props.titleOfColumnList}
                    dataSource={props.data}
                    pagination={
                        {
                            total: props.totalRecord,
                            onChange: (event) => {
                                props.onChangePagination(event)

                            }
                        }
                    }
                />
            </div>
        </div>
    )
}

export default CTable