import {GoodsRequest, SaveGoodsRequest} from "@/api/goods/types.ts";
import axios from "axios";

export function queryGoods(params:GoodsRequest) {
    return axios.get('/api/goods/queryGoods',{params});
}

export function saveGoods(data:SaveGoodsRequest) {
    return axios.post('/api/goods/save',data);
}

export function deleteGoods(params:any){
    return axios.delete('/api/goods/deleteGoods',{params})
}