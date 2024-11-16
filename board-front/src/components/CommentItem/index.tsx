import React from 'react';
import './style.css'
import { CommentListItem } from 'types/interface';
import deafultProfileImage from 'assets/image/default-profile-image.png'

interface Props{
    commentListItem:CommentListItem
}
// componet: Comment List Item 컴포넌트
function CommentItem ({commentListItem}:Props){

    //properties
    const{ nickname, content, profileImage, writeDatetime} = commentListItem;

    // render: Commenr List Item 랜더링
    return (
        <div className='comment-list-item'>
            <div className='comment-list-item-top'>
                <div className='comment-list-item-profile-box'>
                    <div className='comment-list-item-profile-image' style={{backgroundImage:`url(${profileImage?profileImage:deafultProfileImage})`}}></div>
                </div>
                <div className='comment-list-item-nickname'>{nickname}</div>
                <div className='comment-list-item-divider'>{'\|'}</div>
                <div className='comment-list-item-time'>{writeDatetime}</div>
            </div>
            <div className='comment-list-item-main'>
                <div className='comment-list-item-content'>{content}</div>
            </div>
        </div>
    );
};

export default CommentItem;