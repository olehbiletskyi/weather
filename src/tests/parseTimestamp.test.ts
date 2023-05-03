import { parseTimestamp } from 'utils'

describe('parseTimestamp', () => {
  const timestampArray = [
    { timestamp: 1683082947, expectDate: '03:02, 3 of May' },
    { timestamp: 1683136989, expectDate: '18:03, 3 of May' },
    { timestamp: 1683056875, expectDate: '19:47, 2 of May' },
    { timestamp: 1683106099, expectDate: '09:28, 3 of May' },
    { timestamp: 1683082679, expectDate: '02:57, 3 of May' },
    { timestamp: 1673082947, expectDate: '09:15, 7 of January' },
  ]

  test.each(timestampArray)('should be format  - HH:MM, D of Month($timestamp, $expectDate)',
    ({ timestamp, expectDate }) => {
      expect(parseTimestamp(timestamp)).toBe(expectDate)
    })
})