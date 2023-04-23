import React, { memo, useState, useMemo, useRef } from 'react';
import './styles.css';

import { AddressList } from '../../../../../utils/Common/AddressList.js';

const addressList = new AddressList();

const Address = () => {
    const [ADDRESS_PROVINCE, set_ADDRESS_PROVINCE] = useState(['Chọn']);
    const [ADDRESS_District, set_ADDRESS_District] = useState(['Chọn']);
    const [ADDRESS_Commune, set_ADDRESS_Commune] = useState(['Chọn']);
    const [ADDRESS_Hamlet, set_ADDRESS_Hamlet] = useState(['Chọn']);
    const [ADDRESS_Home_Number, set_ADDRESS_Home_Number] = useState(['Chọn']);
    const [textAddress, setTextAddress] = useState('');
    const addressString = useRef('');

    useMemo(() => {
        addressList.getProvince(data => set_ADDRESS_PROVINCE(pre => pre.concat(data)));
    }, []);
    
    
    const handleChangeSelect = (type) => {
        const condition = document.getElementById(type).value; 
        if (type !== 'homeNumber') {
            addressString.current = addressString.current + condition + '-';
        } else {
            addressString.current = addressString.current + condition + '.';
        }
        
        switch(type) {
            case 'province':
                addressList.getDistrict(condition, data => set_ADDRESS_District(pre => pre.concat(data)));
                break;

            case 'district':
                addressList.getCommune(condition, data => set_ADDRESS_Commune(pre => pre.concat(data)));
                break;

            case 'commune':
                addressList.getHamlet(condition, data => set_ADDRESS_Hamlet(pre => pre.concat(data)));
                break;

            case 'hamlet':
                addressList.getHome_Number(condition, data => set_ADDRESS_Home_Number(pre => pre.concat(data)));
                break;

            case 'homeNumber':
                setTextAddress(addressString.current);
                break;

            default:
                throw new Error('Invalid parameter');
          }
    }

    return (
        <div className="Address">
            <p>{'Địa chỉ: ' + textAddress}</p>
            <div>
                <label htmlFor="province">Tỉnh (Thành phố) :</label>
                <select name="province" id="province" onChange={() => handleChangeSelect('province')}>
                    {
                        ADDRESS_PROVINCE.map((data, index) => {
                            return (
                                <option key={index} value={data}>{data}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <label htmlFor="district">Huyện (Quận) :</label>
                <select name="district" id="district" onChange={() => handleChangeSelect('district')}>
                    {
                        ADDRESS_District.map((data, index) => {
                            return (
                                <option key={index} value={data}>{data}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <label htmlFor="commune">Xã (Phường) :</label>
                <select name="commune" id="commune" onChange={() => handleChangeSelect('commune')}>
                    {
                        ADDRESS_Commune.map((data, index) => {
                            return (
                                <option key={index} value={data}>{data}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <label htmlFor="hamlet">Thôn (Xóm) :</label>
                <select name="hamlet" id="hamlet" onChange={() => handleChangeSelect('hamlet')}>
                    {
                        ADDRESS_Hamlet.map((data, index) => {
                            return (
                                <option key={index} value={data}>{data}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <label htmlFor="homeNumber">Số nhà :</label>
                <select name="homeNumber" id="homeNumber" onChange={() => handleChangeSelect('homeNumber')}>
                    {
                        ADDRESS_Home_Number.map((data, index) => {
                            return (
                                <option key={index} value={data}>{data}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    )
}

export default memo(Address);