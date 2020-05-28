// 日期加减 并且格式化
// new Date('2019/09/29 10:56')
// n
function getDateDuration(today, n) {
　　//加上N天的时间
    let s1 = today.getTime() + 3600 * 1000 * 24 * n
    fillTime = formatDate(new Date(s1))
    return fillTime
}

function formatDate(date) {
    let seperator1 = '-';
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month >= 1 && month <= 9) {
        month = '0' + month;
    }
    if (day >= 0 && day <= 9) {
        day = '0' + day;
    }
	
	let hour = date.getHours() 
	let minute = date.getMinutes()
	let second = date.getSeconds()
	
    let currentdate = year + seperator1 + month + seperator1 + day hour + ':' + minute
    return currentdate;
}


module.exports = {
    formatDate,
	getDateDuration
};

