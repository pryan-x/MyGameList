import React from 'react'
import '../../css/PageHeader.css'

const PageHeader = (props) => (
    <div className='flex page-header'>
        <p className='page-name-text'>
        {props.pageHeader}
        </p>
        { props.pageSecondHeader &&
            <p className='page-name-text'>
            {props.pageHeader}
            </p>
        }
    </div>
)

export default PageHeader