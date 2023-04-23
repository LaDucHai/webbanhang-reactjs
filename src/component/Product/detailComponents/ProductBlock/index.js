import React, { memo } from 'react';
import './styles.css';

import ProductBox from './ProductBox';


/** 
*@typedef ProductBlockOptions: array
*/

const ProductBlock = ({props}) => {
    return (
        <div className="ProductBlock">
            <ProductBox props={props.data[0]} />
            <ProductBox props={props.data[1]} />
            <ProductBox props={props.data[2]} />
            <ProductBox props={props.data[3]} />
        </div>
    )
}

export default memo(ProductBlock);