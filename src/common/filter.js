function datePad (str) {
  return (str + '').padStart(2, '0')
}

// 获取道具昵称
export function translatePropName (propsid) {
  const propStore = store.getters['point/prop/propstore']
  let tmpName = ''

  propStore.forEach(item => {
    if (item.propId === propsid) {
      let nameObj = JSON.parse(item.propName)
      tmpName = nameObj[i18n.locale]
    }
  })
  return tmpName
}

// 金钱格式化
export function formatMoney (money) {
  var result = ''
  var counter = 0
  if (money <= 1000000) {
    money = (money || 0).toString()
    for (var i = money.length - 1; i >= 0; i--) {
      counter++
      result = money.charAt(i) + result
      if (!(counter % 3) && i !== 0) {
        result = ',' + result
      }
    }
  } else if (money > 1000000 && money < 1000000000) {
    result = (money / 1000000).toFixed(2)
    result = result + ' million'
  } else {
    result = (money / 1000000000).toFixed(2)
    result = result + ' billion'
  }
  return result
}

export function formatDateTime (timestamp, format = 'yyyy-MM-dd hh-mm-ss') {
  const fDate = new Date(timestamp)

  const year = fDate.getFullYear()
  const month = datePad(fDate.getMonth() + 1)
  const date = datePad(fDate.getDate())
  const hours = datePad(fDate.getHours())
  const minutes = datePad(fDate.getMinutes())
  const seconds = datePad(fDate.getSeconds())

  return format.replace('yyyy', year).replace('MM', month).replace('dd', date).replace('hh', hours).replace('mm', minutes).replace('ss', seconds)
}

export function isSameWeek (timestamp1, timestamp2) {
  const oneDayTime = 1000 * 60 * 60 * 24
  const days1 = parseInt(timestamp1 / oneDayTime)
  const days2 = parseInt(timestamp2 / oneDayTime)
  return parseInt((days1 + 4) / 7) === parseInt((days2 + 4) / 7)
}

export function beforeDateTime (timestamp) {
  const formatDate = new Date(timestamp)
  const fDay = formatDate.getDay()

  const nowDate = new Date()
  const thisYear = nowDate.getFullYear()
  const thisMonth = nowDate.getMonth()
  const thisDate = nowDate.getDate()
  const thisDay = nowDate.getDay()

  const yesterdaysStart = new Date(thisYear, thisMonth, thisDate - 1).getTime()
  const todayStart = new Date(thisYear, thisMonth, thisDate).getTime()
  const todayEnd = todayStart + 24 * 60 * 60 * 1000
  const thisWeekStartDate = thisDate - (thisDay || 7) + 1
  const thisWeekStart = new Date(thisYear, thisMonth, thisWeekStartDate).getTime()
  const thisYearStart = new Date(thisYear, 0, 1).getTime()

  // 大于今天结束时间
  if (timestamp > todayEnd) {
    return formatDateTime(timestamp)
  }

  // 今天
  if (timestamp >= todayStart) {
    return formatDateTime(timestamp, 'hh:mm')
  }

  // 昨天
  if (timestamp >= yesterdaysStart) {
    return formatDateTime(timestamp, `${i18n.t('dateTime.yesterday')} hh:mm`)
  }

  // 这周内
  if (timestamp >= thisWeekStart) {
    return formatDateTime(timestamp, `${i18n.t('dateTime.weeks')[fDay]} hh:mm`)
  }

  // 今年时间内
  if (timestamp >= thisYearStart) {
    return formatDateTime(timestamp, i18n.t('dateTime.thisYearFormat'))
  }

  // 今年前
  return formatDateTime(timestamp)
}

export function secondsFormat (timestamp) {
  var rstime = ''
  let pubtimeout = timestamp
  if (pubtimeout < 0) { pubtimeout = 1 }
  if (pubtimeout < 3600000) {
    rstime = Math.floor(pubtimeout / 60 / 1000) + i18n.t('common.minute')
  } else if (pubtimeout < 86400000) {
    rstime = Math.floor(pubtimeout / 60 / 60 / 1000) + i18n.t('common.hour')
  } else {
    rstime = Math.floor(pubtimeout / 86400000) + i18n.t('common.day')
  }
  return rstime
}
/**
 * 时间格式为：XXX+小时/分钟+后。当时间超过1小时，则单位为小时，仅展示小时数。当时间不足1小时，则单位为分钟，展示分钟数。如3分6秒比赛开始，则展示4min。4小时4分钟比赛开始，则展示5h。59分32秒，展示1h
 * @param {Object} { endTime, serverTime, blobalState }
 */
export function formatCountDownTime ({ endTime, serverTime = new Date().getTime(), globalState }) {
  const min = (endTime - serverTime) / 60000
  let end = min >= 60 ? Math.ceil(min / 60) : min
  const uint = min >= 60 ? i18n.t('common.hour') : i18n.t('common.minute')
  let tips = Math.max(1, Math.ceil(end)) + uint
  if (globalState === 'ON_GOING') {
    tips = i18n.t('quizChannelBet.going')
  } else if (globalState === 'END') {
    tips = i18n.t('quizChannelBet.ended')
  }
  return tips
}

// 时分秒格式
// 11:22:33
export function hhmmss (seconds) {
  const h = Math.floor(seconds / 3600).toFixed(0)
  const m = Math.floor((seconds - 3600 * h) / 60).toFixed(0)
  const s = seconds - 3600 * h - 60 * m
  return `${h}:${m}:${s}`
}
