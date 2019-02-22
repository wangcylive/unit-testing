import { isSameWeek } from '@/common/filter'

test('filter isSameWeek', () => {
  expect(isSameWeek(new Date(2018, 8, 10).getTime(), new Date(2018, 8, 15))).toBeTruthy()
})