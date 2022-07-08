// 这个文件专门用于对home页面的数据请求
// 导入网络请求模块
import { request } from 'network/request'

export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}

// 根据接口的需要传递参数
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}