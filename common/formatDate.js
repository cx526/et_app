// 日期加减 并且格式化
// new Date('2019/09/29 10:56')
// n
function formatDate(today, n) {
　　//加上N天的时间
    let s1 = today.getTime() + 3600 * 1000 * 24 * n
    fillTime = moment(s1).format('YYYY-MM-DD HH:mm:ss')
    return fillTime
}


module.exports = {
    formatDate
};

