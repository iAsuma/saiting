const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatWeek = n => {
  const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return weeks[n];
}

const minus = (s, e) => {
  var res = parseInt(e.getTime() - s.getTime()) / (60 * 60 * 1000)
  return Math.round((res * 10)) / 10
}

const dateNeed = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const week = date.getDay()
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [year, [month, day].map(formatNumber).join('-'), formatWeek(week),[hour, minute].map(formatNumber).join(':'), month+'月'+day+'日'];
}

module.exports = {
  formatTime: formatTime,
  dateNeed: dateNeed,
  minus: minus
}

