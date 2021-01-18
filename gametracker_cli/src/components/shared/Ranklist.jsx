import React from 'react';
import { Link } from 'react-router-dom'

import '../../css/Ranklist.css'

const Ranklist = (props) => {
    const {
        listName,
        listContent
    } = props
    return(
        <div className='flex-col ranklist-container'>
            <div className='flex ranklist-header-container'>
                <p className='ranklist-header'>{listName}</p>
                <p className='ranklist-header-expand-link'>More</p>
            </div>
            <div className='flex-col ranklist-list-container'>
                {renderListItems(listContent)}
            </div>
        </div>
    )
}
const renderListItems = (content) => (
    content.map((item, id) => (
        <div key={id} className='flex ranklist-item'>
            <p className='ranklist-rank'>{id+1}</p>
            <Link className='ranklist-img-link' to={`/game/${item.id}`}>
            <img 
                src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${item.cover.image_id}.jpg`} 
                // src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover.image_id}.jpg`} 
                alt='img'
            />
            </Link>
            <div className='flex-col ranklist-metadata'>
                <div className='ranklist-title-wrapper'>
                    <Link className='ranklist-title'  to={`/game/${item.id}`}>
                        {item.name}
                    </Link>
                </div>
                <div className='flex-col ranklist-submetadata'>
                    <p>{formatPlatformList(item.platforms)}</p>
                    <p className='ranklist-rating'>
                        Score: {
                            item.rating 
                                ? `${(item.rating/10).toFixed(2)} (${item.rating_count})` 
                                : 'TBD'
                        }
                    </p>
                    {item.follows && 
                    <p className='ranklist-followers'>Followers: {item.follows}</p>
                    }
                </div>
            </div>
        </div>
    ))
)

const formatPlatformList = (list) => (
    list.map((platform) => (
        platform.name.includes(' (Microsoft Windows)') 
        ? 'PC'
        : platform.name
                    // if(platform.name.includes(' (Microsoft Windows)')) {
                    //     return 'PC'
                    // }
                    // return platform.name
    )).join(', ')
)


export default Ranklist
