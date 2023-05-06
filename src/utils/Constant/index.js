export const SERVERADDRESS = 'http://localhost:4000';
// export const SERVERADDRESS = 'http://103.178.233.184:4000';
export const SERVERSOCKET = 'http://localhost:5000';
export const SERVERSOCKET1 = 'http://localhost:5001';

// encode token
export const TOKENENCODESTRING = 'Bearer';
export const TOKEN = window.localStorage.getItem('token webbanhang');
export const USERINFOR = JSON.parse(window.sessionStorage.getItem('userInfor'));

// Constant in TABLE UserInfor in database webbanhang
export const UC_UserInfor_Account_Name = 'UC_UserInfor_Account_Name';
export const UC_UserInfor_Phone = 'UC_UserInfor_Phone';
export const UC_UserInfor_Email = 'UC_UserInfor_Email';