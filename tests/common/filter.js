import { isSameWeek } from '@/common/filter'

expect.extend({
  toBeWithinRange (received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      }
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      }
    }
  },
})

test('filter isSameWeek', () => {
  expect(isSameWeek(new Date(2018, 8, 10).getTime(), new Date(2018, 8, 15))).toBeTruthy()
})

describe('describeTest', () => {
  test('describeTest test1', () => {
    expect(100).toBeWithinRange(90, 110)
  })
  test('describeTest test2', () => {
    expect(Math.random() * 100).toBeWithinRange(0, 100)
  })
})