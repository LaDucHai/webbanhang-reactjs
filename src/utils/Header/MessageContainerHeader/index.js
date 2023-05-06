import React, { memo } from 'react';
import './styles.css';

import MessageBoxHeader from './MessageBoxHeader';

const MessageContainerHeader = () => {
    const data = [1,2,3,4]
    const load_MessageBoxHeader = data.map((data, index) => {
        return (
            <div key={index}>
                <MessageBoxHeader props={data} />
            </div>
        )
    })
    return (
        <div className="MessageContainer_Header">
            {load_MessageBoxHeader}
        </div>
    )
}

export default memo(MessageContainerHeader);