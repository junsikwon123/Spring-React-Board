import React from 'react';
import './style.css'
import { FavoriteListItem } from 'types/interface';
import defaultProfileImage from 'assets/image/default-profile-image.png'

interface Props{
    favoriteListItem : FavoriteListItem
}
    // componet : Favorit List Item 컴포넌트
function FavoriteItem({favoriteListItem}:Props) {
    
    // componet : properties
    const {nickname, profileImage} =favoriteListItem

    // reder: Favorite List Item 랜더링
    return (
        <div className='favorite-list-item'>
            <div className='favorite-list-item-profile-box'>
                <div className='favorite-list-item-profile-image' style={{backgroundImage:`url(${profileImage ?profileImage:defaultProfileImage})`}}></div>
            </div>
            <div className='favorite-list-item-nickname'>{nickname}</div>
        </div>
    );
}

export default FavoriteItem;