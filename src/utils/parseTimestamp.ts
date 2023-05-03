import { months } from 'constants/months'

const parseTimestamp = (stamp: number): string => {
  const date = new Date(+stamp * 1000)
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()
  const day = date.getUTCDate()
  const month = date.getUTCMonth()
  const hoursLength = hours.toString().length
  const minutesLength = minutes.toString().length

  return `${hoursLength === 2 ? hours : '0' + +hours}:${minutesLength === 2 ? minutes : '0' + +minutes}, ${day} of ${months[month+1]}`
}

export default parseTimestamp
