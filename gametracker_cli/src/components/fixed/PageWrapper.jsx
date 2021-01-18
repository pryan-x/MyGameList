import React from 'react'
import BackgroundImage from './BackgroundImage.jsx'
import '../../css/base/PageWrapper.css'


export default (props) => (
    <div className='flex page-background'>
        <div className='shadow-test'></div>
        <div className='page-container'>
            {props.children}
        </div>
        <div className='shadow-test'></div>
        {props.backgroundImages && <BackgroundImage images={props.backgroundImages}/>}
    </div>
)

