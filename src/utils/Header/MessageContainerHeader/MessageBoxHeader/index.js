import React, { memo } from 'react';
import './styles.css';


const MessageBoxHeader = () => {
    return (
        <div className="MessageBoxHeader">
            <p className='MessageBoxHeader-text'>NAME</p>
            <div>
                <div className='MessageBoxHeader-text'>Tin nhắn mới</div>
                <div className='MessageBoxHeader-number'>
                    <div>1</div>
                </div>
            </div>
        </div>
    )
}

export default memo(MessageBoxHeader);