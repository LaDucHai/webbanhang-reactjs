import React, { useRef, useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { SERVERADDRESS } from '../../utils/Constant';

/** 
*@typedef {
*Account_Name: string,
*Password: string,
*} LoginOptions
*/

const Login = () => {

    const [note, setNote] = useState();
    const verifySuccess = useRef(true); // glo-variable to manager verify
    const loginState = useRef(false);

    // check user login or not login
    let token = window.localStorage.getItem('token webbanhang');
    if (token !== null) {
        loginState.current = true;
    }

    const oke_login = () => {
        let arr_id = ['account', 'password'];
        let getElementByIdArr = [];
        for (let i = 0; i < arr_id.length; i++) {
            getElementByIdArr[i] = document.getElementById(`${arr_id[i]}`);
        }

        // verify the inputs (null or not null)
        for (let i = 0; i < arr_id.length; i++) {
            if (!(getElementByIdArr[i] && getElementByIdArr[i].value)) {
                getElementByIdArr[i].style.border = "3px solid red";
                verifySuccess.current = false;
            }
        }
        
        let loginOptions = {
            Account_Name: getElementByIdArr[0].value,
            Password: getElementByIdArr[1].value
        };

        // send login infor to server via axios
        axios({
            method: 'post',
            url: `${SERVERADDRESS}/login`,
            data: loginOptions
        }).then(res => { 
            // if login successly, save token here
            if (res.data.loginState) {
                window.localStorage.setItem('token webbanhang', res.data.token.tokenLogin);
                setNote('Đăng nhập thành công');
                loginState.current = true;
            } else {
                setNote('Tài khoản hoặc mật khẩu không chính xác');
            }
            
        }).catch(err => console.error(err));
    }
    
    const inputClick = (id) => {       
        document.getElementById(`${id}`).style.border = "1px solid black";
    }

    return (
        !loginState.current 
        ?
        <div className="Login">
            <div>  
                <input onClick={() => inputClick('account')} className='input' id='account' placeholder='tài khoản'/>
                <input onClick={() => inputClick('password')} className='input' id='password' placeholder='mật khẩu' />
            </div>
            <div className='btnContainer'>
                <button onClick={() => oke_login()} className='btn btnLogin'>Đăng nhập</button>
                <button className='btn btnSignup'><Link className='nav-link' to='/signup'>Đăng ký</Link></button>
            </div>

            <div className='note'>
                <p>{note}</p>
                {
                    loginState.current ?
                    <Link to='/'>Đi tới trang chủ</Link>:<p></p>
                }
            </div>
        </div>
        :
        <Link to='/'>Đi tới trang chủ</Link>
    )
}

export default Login;