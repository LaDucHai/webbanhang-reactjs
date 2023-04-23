import axios from "axios";
import { SERVERADDRESS, TOKENENCODESTRING } from "../Constant";

// get user infor
export const getUserInfor = () => {
    const token = window.localStorage.getItem('token webbanhang');
    axios({
        method: 'get',
        url: `${SERVERADDRESS}/getUserInfor`,
        headers: {
            Authorization: `${TOKENENCODESTRING} ${token}`
        }
    }).then(res => {
        if (res.data.state) {
            window.sessionStorage.setItem('userInfor', JSON.stringify(res.data.data));
        } else {
            console.log('get user infor failure');
        }
    }).catch(err => console.error(err));
}

// get company infor
export const getCompanyInfor = () => {
    const token = window.localStorage.getItem('token webbanhang');
    axios({
        method: 'get',
        url: `${SERVERADDRESS}/companymyCompany`,
        headers: {
            Authorization: `${TOKENENCODESTRING} ${token}`
        }
    }).then(res => {
        // res.data.data.rowsAffected[0] > 0 is that company exist
        if (res.data.data.rowsAffected[0] > 0) {
            window.sessionStorage.setItem('companyInfor', JSON.stringify(res.data.data.recordset[0]));
        } else {
            console.log('get company infor failure');
        }
    }).catch(err => console.error(err));
}

// conver array 1d to 2
export const Arr_1d_to_2d = (arr_1d, column) => {
    let arr_2d = [];
    let m = 0;
    let arr = [];
    while(true) {
        arr = [];
        if (m < arr_1d.length) {
            for(let j = 0; j < column; j++) {
                if (m < arr_1d.length) {
                    arr.push(arr_1d[m]);
                    m++;
                }  
            }
            arr_2d.push(arr);
        } else {
            break;
        }
    }
    
    return arr_2d;
}