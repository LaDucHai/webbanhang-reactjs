import React, { useRef } from "react";
import './styles.css';
import { Link } from 'react-router-dom';

import { FiShoppingCart } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';


const Header = () => {
    const loginState = useRef(false);

    // check user login or not login
    let token = window.localStorage.getItem('token webbanhang');
    if (token !== null) {
        loginState.current = true;
    }

    const oke_logout = () => {
        window.localStorage.removeItem('token webbanhang');
    }

    return (
        <div>
           <nav>
                <ul className="Header">
                    <div>
                        <li className="HeaderComponent"><Link className='nav-link' to='/'>Trang chủ</Link></li>
                        <li className="HeaderComponent"><Link className='nav-link' to='/product'>Sản phẩm</Link></li>
                        <li className="HeaderComponent"><Link className='nav-link' to='/contact'>Liên hệ</Link></li>
                        <li className="HeaderComponent"><Link className='nav-link' to='/report'>Báo cáo</Link></li>
                        {
                            loginState.current ?
                            <li onClick={() => oke_logout()} className="HeaderComponent"><Link className='nav-link' to='/login'>Thoát</Link></li>:
                            <li className="HeaderComponent"><Link className='nav-link' to='/login'>Đăng nhập</Link></li>
                        }
                    </div>
                    <div className="Header-iconContainer">
                        <IoMdNotificationsOutline className="Header-icon" size={22} />
                        <FiShoppingCart className="Header-icon" size={22} />
                        <Link className='nav-link' to='/profile/myProfile'><img className="Header-avatar" src="https://tse4.mm.bing.net/th?id=OIP.Dc9z4uo9fSeFHzKyRvimbQHaEK&pid=Api&P=0" alt="avatar" /></Link>
                    </div>
                </ul>    
            </nav>
        </div>
    )
}

export default Header;