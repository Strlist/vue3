// 分页参数
export interface Pagination {
    current: number;
    pageSize: number;
    total?: number;
}
// 请求参数  mock数据时的
export interface GetParams {
    body: null;
    type: string;
    url: string;
}