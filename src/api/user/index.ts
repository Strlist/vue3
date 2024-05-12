import axios from "axios";
import {LoginRequest} from "@/api/user/types.ts";

export const getUserInfo = ()=>{
    return axios.get('/api/user/getUserInfo');
}

export const login = (data:LoginRequest) =>{
    return axios.post('/api/user/login',data)
}