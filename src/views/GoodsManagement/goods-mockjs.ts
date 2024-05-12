import Mock from 'mockjs';
import qs from 'query-string';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import type { GetParams } from '@/types/global';
import {MockParams} from "@/types/mock.ts";

const data = Mock.mock({
    'list|100': [
        {
            'id|8': /[A-Z][a-z][-][0-9]/,
            'name|4-8': /[A-Z]/,
            'inboundTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
            'stockpile': '@integer(1, 100)',
        }
    ]
});

setupMock({
    setup() {
        Mock.mock(new RegExp('/api/goods/queryGoods'), (params: GetParams) => {

            const result = qs.parseUrl(params.url).query;
            //处理数组问题
            let temp = JSON.stringify(result).replace("[]","")
            const { current = 1, pageSize = 10 ,inboundTime,id,name} = JSON.parse(temp);
            const p = current as number;
            const ps = pageSize as number;
            const searchIdPattern = new RegExp(id, 'i');
            const searchNameTerm = new RegExp(name, 'i');
            // 将字符串时间转换为Date对象
            var minPublishDate:Date|undefined;
            var maxPublishDate:Date|undefined;
            if(inboundTime){
                minPublishDate = new Date(inboundTime[0])
                maxPublishDate = new Date(inboundTime[1])
            }
            console.log(inboundTime);
            // 使用filter进行模糊查询
            const filteredItems = data.list.filter((item:any) => {
                // 检查ID是否满足条件（非空且匹配正则表达式）
                const idMatches = !id||searchIdPattern.test(item.id);

                // 检查名称是否满足条件（非空且包含搜索词）
                const nameMatches = !name||searchNameTerm.test(item.name);
                // 将发布时间字符串转换为Date对象
                const inboundDate = new Date(item.inboundTime);
                const timeMatches = !inboundTime||(inboundDate >= minPublishDate! && inboundDate <= maxPublishDate!);

                // 只有当ID和名称都满足条件时，才返回true
                return idMatches && nameMatches&&timeMatches;
            });
            return successResponseWrap({
                list: filteredItems.slice((p - 1) * ps, p * ps),
                total: filteredItems.length
            });
        });
        Mock.mock(new RegExp('/api/goods/save'), (params: MockParams) => {
            const requestParams = JSON.parse(params.body)
            if(requestParams.id){
                // 修改
                data.list.forEach((item:any,index:number)=>{
                    if (item.id===requestParams.id){
                        data.list[index].name=requestParams.name
                        data.list[index].stockpile=requestParams.stockpile
                        return
                    }
                })
            }else{
                //添加
                data.list.push({
                    id:uuid(),
                    inboundTime: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').substring(0, 19),
                    name:requestParams.name,
                    stockpile:requestParams.stockpile
                })
            }
        });
        Mock.mock(new RegExp('/api/goods/delete'), (params: MockParams) => {
            const result = qs.parseUrl(params.url).query;
            const queryParamId = result.id
            data.list = data.list.filter((item:any)=>{
                return item.id!==queryParamId
            })
        });
    }
});

function uuid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
