const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// const monthTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()
//
//   return [month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
// }
// const days = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()
//
//   return [year, month, day].map(formatNumber).join('-')
// }
// const setHour = n => {
//
//   if (10 <= n && n < 13){
//     n = '10-13'
//   } else if (13 <= n && n < 16){
//     n = '13-16'
//   } else if (16 <= n && n < 19) {
//     n = '16-19'
//   } else if (19 <= n && n < 21) {
//     n = '19-21'
//   } else{
//     n = '21-24'
//   }
//   return n
// }
// const Time = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()
//   return setHour(hour)
// }
module.exports = {
  formatTime: formatTime,

}
