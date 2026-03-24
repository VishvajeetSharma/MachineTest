import axios from "axios"; 
const BASE_URL='http://localhost:4500'; 

export const userRegisterService=async(data)=>{
 const res=await axios.post(`${BASE_URL}/user/create-user`,data);
 return res?.data
}

export const userLoginService=async(data)=>{
 const res=await  axios.post(`${BASE_URL}/user/login-user`,data);
 return res?.data
}