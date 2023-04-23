import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Header from '../../utils/Header';
import ProductBlock from './detailComponents/ProductBlock';
import { SERVERADDRESS } from '../../utils/Constant/index';


let ojb = {
    data: [
        {
            image: 'https://tse4.mm.bing.net/th?id=OIP.SImuTIY-GK04MoP9sBNHUQHaHa&pid=Api&P=0',
            title: 'smart Phone',
            price: 123,
            sales: 35,
            like: 50,
            amountOfSold: 100
        },
        {
            image: 'https://tse4.mm.bing.net/th?id=OIP.SImuTIY-GK04MoP9sBNHUQHaHa&pid=Api&P=0',
            title: 'smart Phone',
            price: 123,
            sales: 35,
            like: 50,
            amountOfSold: 100
        },
        {
            image: 'https://tse4.mm.bing.net/th?id=OIP.SImuTIY-GK04MoP9sBNHUQHaHa&pid=Api&P=0',
            title: 'smart Phone',
            price: 123,
            sales: 35,
            like: 50,
            amountOfSold: 100
        },
        {
            image: 'https://tse4.mm.bing.net/th?id=OIP.SImuTIY-GK04MoP9sBNHUQHaHa&pid=Api&P=0',
            title: 'smart Phone',
            price: 123,
            sales: 35,
            like: 50,
            amountOfSold: 100
        }
    ]
}

const Product = () => {
    const [data, setData] = useState([ojb,ojb,ojb,ojb]);
    const [textValue, setTextValue] = useState("");
    const [preValue, setPreValue] = useState("");

    useEffect(() => {
        
    }, []);

    window.onscroll = function() {
        const scrollable = window.innerHeight + document.documentElement.scrollTop - document.documentElement.offsetHeight
        if(scrollable===0) {
            setData(currentValue => [...currentValue, ojb])
        }
    }

    const LoadMore = data.map((data, index) => {
        return (
            <div key={index}>
                <ProductBlock props={data} />
            </div>
        )
    })
    

    // const handleFile = (e) => {
    //     const file = e.target.files[0];
    //     console.log(file);
    //     console.log(URL.createObjectURL(file));
    // }

    const btnOnclick = () => {
        axios({
            method: 'post',
            url: `${SERVERADDRESS}/testfile`,
            data: {
                data: textValue
            }
        }).then(res => {
            console.log(res.data);
        }).catch(err => console.error(err));
    }

    const btnOnclick1 = () => {
        axios({
            method: 'get',
            url: `${SERVERADDRESS}/testfile`
        }).then(res => {
            console.log(res.data);
            setPreValue(res.data.data);
        }).catch(err => console.error(err));
    }

    return (
        <div className="Product">
            <div className='headerProduct'>
                <Header />
            </div>
            <div className='bodyProduct'>
                <div className='searchContainer'>
                    <input className='input' id='search' placeholder='Tìm kiếm' />
                </div>
                <div className='productContainer'>
                    <div className='smartSearch'>
                        <div>tim kiem nang cao</div>
                        <div>
                            <button><Link className='nav-link' to='/product/addProduct'>Thêm sản phẩm</Link></button>
                        </div>
                    </div>
                    <div className='loadSearch'>
                    { LoadMore }
                    </div>
                    <div className='detailProduct'>
                        {/* <input type='file' onChange={(e) => handleFile(e)}/> */}
                        <textarea id='textarea' rows={9} onChange={() => setTextValue(document.getElementById('textarea').value)}></textarea>
                        <p>{textValue}</p>
                        <button onClick={() => btnOnclick()}>btn</button>
                        <button onClick={() => btnOnclick1()}>btn1</button>
                        <pre>{preValue}</pre>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Product;