// 定义成员：
const sum = function (a, b) {
    return parseInt(a) + parseInt(b)
}
const subtract = function (a, b) {
    return parseInt(a) - parseInt(b)
}

// 设置那些方法可以被调用
module.exports = {
    sum,
    subtract
}