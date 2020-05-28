// 日期加减 并且格式化
// new Date('2019/09/29 10:56')
// n
function getDateDuration(today, n) {
　　//加上N天的时间
    let s1 = today.getTime() + 3600 * 1000 * 24 * n
    let fillTime = formatDate(new Date(s1))
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
	if (hour >= 0 && hour <= 9) {
	    hour = '0' + hour;
	}
	let minute = date.getMinutes()
	if (minute >= 0 && minute <= 9) {
	    minute = '0' + minute;
	}
	let second = date.getSeconds()
	if (second >= 0 && second <= 9) {
	    second = '0' + second;
	}
	
    let currentdate = year + seperator1 + month + seperator1 + day + ' ' + hour + ':' + minute
    return currentdate;
}


module.exports = {
    formatDate,
	getDateDuration
};

