export interface GoodsRequest{
    current: number,
    pageSize: number,
    id: string,
    name: string,
    inboundTime?:[],
}

export interface SaveGoodsRequest{
    id?: string,
    name?: string,
    stockpile?:number,
}

export interface GoodsResponse{
    id?: string,
    name?: string,
    inboundTime?:string,
    stockpile?:number,
}