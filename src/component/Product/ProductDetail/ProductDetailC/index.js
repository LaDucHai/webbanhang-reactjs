import React, { memo, useMemo, useState } from 'react';
import './styles.css';

import { FiStar } from 'react-icons/fi';


const ProductDetailC = ({onData}) => {
    const [startColor, setStartColor] = useState([]);

    useMemo(() => {
        const startNumber = onData.Company_Star;
        if (startNumber >= 1 && startNumber < 2) {
            setStartColor(['yellow']);
        } else if (startNumber >= 2 && startNumber < 3) {
            setStartColor(['yellow', 'yellow']);
        } else if (startNumber >= 3 && startNumber < 4) {
            setStartColor(['yellow', 'yellow', 'yellow']);
        } else if (startNumber >= 4 && startNumber < 5) {
            setStartColor(['yellow', 'yellow', 'yellow', 'yellow']);
        } else if (startNumber === 5) {
            setStartColor(['yellow', 'yellow', 'yellow', 'yellow', 'yellow']);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="ProductDetailC">
            <div className='ProductDetailC-header'>
                <div>
                    <img src={onData.Company_Avatar_URL} alt='ProductDetailC'/>
                    <h4>{onData.Company_Name}</h4>
                </div>
                <div>
                    <FiStar className='ProductDetailC-startIcon' color={startColor[0]} />
                    <FiStar className='ProductDetailC-startIcon' color={startColor[1]} />
                    <FiStar className='ProductDetailC-startIcon' color={startColor[2]} />
                    <FiStar className='ProductDetailC-startIcon' color={startColor[3]} />
                    <FiStar className='ProductDetailC-startIcon' color={startColor[4]} />
                </div>
                
            </div>
            
            <div className="ProductDetailC-img">
                <img src={onData.Company_BackgroudImage_URL} alt='ProductDetailC' />
                <div>
                    <div>
                        <div>
                            <img src={onData.Company_Avatar_URL} alt='ProductDetailC'/>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>Thông tin</div>
                <iframe className='ProductDetailC-companyInfor' title='ProductDetailC-companyInfor' src={onData.Company_Infor_URL}></iframe>
            </div>
        </div>
    )
}

export default memo(ProductDetailC);