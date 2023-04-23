import React, { memo } from 'react';
import './styles.css';
import  { FcLike } from 'react-icons/fc';
 
/** 
*@typedef {
*image: string,
*title: string,
*price: number,
*sales: number,
*like: number,
*amountOfSold: number
*} ProductBoxOptions, // as: InformationOptions
*/

const ProductBox = ({props}) => {
    return (
        <div className="ProductBox">
            <div className='imgContainer-ProductBox'>
                {
                    props.sales > 0 ?
                    <div className='number-basic-infor-imgContainer-ProductBox'>{`${props.sales}%`}</div>:<></>
                }
                
                <img src={props.image} alt='imgp'/>
                <div className='describeContainer-imgContainer-ProductBox'>
                    <div>
                        <div>{props.title}</div>
                    </div>
                </div>          
            </div>
            
            <div className='basic-infor-Container-ProductBox'>
                <div>
                    <div>
                        <FcLike />
                        <div className='number-basic-infor-Container-ProductBox'>{`: ${props.like}`}</div>
                    </div>
                    <div>
                        <div>Bán</div>
                        <div className='number-basic-infor-Container-ProductBox'>{`: ${props.amountOfSold}`}</div>
                    </div>
                    <div>
                        <div>Giá</div>
                        <div className='number-basic-infor-Container-ProductBox'>{`: ${props.price}`}</div>
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default memo(ProductBox);