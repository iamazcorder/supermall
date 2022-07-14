// 防抖函数
export function debounce(func, delay) {
    let timer = null
    return function (...args) {
        if (timer) {
            clearTimeout(timer)   //关闭定时器
        }
        timer = setTimeout(() => {   //重新开启定时器
            // this用于修正this指向
            func.apply(this, args)
        }, delay)
    }
}