import React from 'react'

interface Props {
    title: string
    number: number
    icon: any
}

const TotalBox = (props: Props) => {
    return (
        <div className='total-box'>
            <div className='total-box'></div>
            <div className="total-box-title">
                {props.title}
            </div>

        </div>
    )
}

export default TotalBox