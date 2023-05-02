import { months } from 'constants/months'

const parseTimestamp = (stamp: string): string => {
  const date = new Date(+stamp * 1000)

  const hours = date.getHours()
  const minutes = date.getMinutes()
  const day = date.getDate()
  const month = date.getMonth()

  return `${hours}:${minutes}, ${day} of ${months[month]}`
}

export default parseTimestamp
