import React from 'react'
import BackgroundImage from './BackgroundImage.jsx'
import '../../css/PageWrapper.css'


export default (props) => (
    <div className='flex page-background'>
        {/* flex-col IMPORTANT TO FILL AREA OF MIN-HEIGHT FROM PAGE-WRAPPER */}
        {/* <div className='flex-col page-container'> */}
        <div className='page-container'>
            {props.children}
        </div>
    {props.backgroundImages && <BackgroundImage images={props.backgroundImages}/>}
    </div>
)

