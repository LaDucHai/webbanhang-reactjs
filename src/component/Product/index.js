import React, { useState, useRef, useMemo } from 'react';
import './styles.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Header from '../../utils/Header';
import ProductBlock from './detailComponents/ProductBlock';
import ProductInforBlock from './detailComponents/ProductInforBlock';
import { SERVERADDRESS, TOKENENCODESTRING } from '../../utils/Constant/index';
import { Arr_1d_to_2d } from '../../utils/Common';


const Product = () => {
    const [data, setData] = useState([]);
    // const [textValue, setTextValue] = useState("");
    // const [preValue, setPreValue] = useState("");
    const pageIndex = useRef(1);
    const remainState = useRef(true);
    
    const pageSize = 16;
    const token = window.localStorage.getItem('token webbanhang');

    // respinsive /* samsung galaxy A51/71: 412px*/
    const isSamsungGalaxy = useMediaQuery({
        query: '(max-width: 500px)'
    })

    const getProduct = async (pageIndex) => {
        try {
            const res = await axios({
                method: 'get',
                url: `${SERVERADDRESS}/product?type=product&pageIndex=${pageIndex}&pageSize=${pageSize}`,
                headers: {
                    Authorization: `${TOKENENCODESTRING} ${token}`
                }
            })
            if (res.data.state) {
                if (res.data.data.rowsAffected[1] < pageSize) {
                    remainState.current = false;
                }
                return res.data.data.recordset;
            } 
            return [];
        } catch (error) {
            console.error(error);
        }
    }

    const getProductImage = async (Product_Id) => {
        try {
            const res = await axios({
                method: 'get',
                url: `${SERVERADDRESS}/product?type=productImage&productId=${Product_Id}`,
                headers: {
                    Authorization: `${TOKENENCODESTRING} ${token}`
                }
            })
            if (res.data.state) {
                return res.data.data.recordset;
            } 
            return [];
        } catch (error) {
            console.error(error);
        }
    }

    const getData = async (pageIndex) => {
        let productArr = await getProduct(pageIndex);
        let new_productArr = [];
        for (let i = 0; i < productArr.length; i++) {
            let imgArr = [];
            imgArr = await getProductImage(productArr[i].Product_Id);
            productArr[i].Product_Image = imgArr;
            new_productArr.push(productArr[i]);
        }
        const arr_2d = Arr_1d_to_2d(new_productArr, 4);
        setData(pre => pre.concat(arr_2d));
    }

    useMemo(() => {
        getData(pageIndex.current);  

        // load more
        window.onscroll = function() {
            const scrollable = window.innerHeight + document.documentElement.scrollTop - document.documentElement.offsetHeight;
            if((scrollable >= -500) && remainState.current) {
                pageIndex.current = pageIndex.current + 1; 
                getData(pageIndex.current);
            }
        } 

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    // const btnOnclick = () => {
    //     axios({
    //         method: 'post',
    //         url: `${SERVERADDRESS}/testfile`,
    //         data: {
    //             data: textValue
    //         }
    //     }).then(res => {
    //         console.log(res.data);
    //     }).catch(err => console.error(err));
    // }

    // const btnOnclick1 = () => {
    //     axios({
    //         method: 'get',
    //         url: `${SERVERADDRESS}/testfile`
    //     }).then(res => {
    //         console.log(res.data);
    //         setPreValue(res.data.data);
    //     }).catch(err => console.error(err));
    // }

    return (
        <div className="Product">
            <div className='headerProduct'>
                <Header />
            </div>
            <div className='bodyProduct'>
                {
                    !isSamsungGalaxy ?
                    <div className='searchContainer'>
                        <input className='input' id='search' placeholder='Tìm kiếm' />
                    </div>:<div></div>
                }
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
                        {/* <textarea id='textarea' rows={9} onChange={() => setTextValue(document.getElementById('textarea').value)}></textarea>
                        <pre>{preValue}</pre>
                        <button onClick={() => btnOnclick()}>btn</button>
                        <button onClick={() => btnOnclick1()}>btn1</button>
                        <pre style={{width: '300px', backgroundColor: 'yellow'}}>{preValue}</pre> */}
                        <ProductInforBlock />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Product;