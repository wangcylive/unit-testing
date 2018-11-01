import isDouble from '../../src/views/a.js'

test('isDouble', () => {
  expect(isDouble(10)).toBe(true)
  expect(isDouble(1)).toBe(false)
  expect(isDouble(false)).toBe(false)
  expect(isDouble('20')).toBe(true)
})

test('toEqual', () => {
  expect({name: 2}).toEqual({name: 2})
  expect([1, 2, 3]).toEqual([1, 2, 3])
})

test('not', () => {
  expect(3).not.toBe(2)
})

test('null', () => {
  const n = null
  expect(n).toBeNull()
  expect(n).not.toBeUndefined()
  expect(n).toBeDefined()
  expect([]).toBeTruthy()
  expect({}).toBeTruthy()
  expect(n).toBeFalsy()
})

test('number', () => {
  expect(4).toBeGreaterThan(3)
  expect(1).toBeGreaterThanOrEqual(1)
  expect(3.9999999999999).toBeLessThan(4)
  expect(5).toBeLessThanOrEqual(6)
  expect(0.30000).toBeCloseTo(0.3)
  expect(0.00001).toBe(0.00001)
  expect(4.5).toEqual(4.5)

  const value = 0.1 + 0.2
  expect(value).toBeCloseTo(0.3)
})

test('string', () => {
  const str = 'http://www.google.com'
  expect(str).toMatch(/http/)
  expect(str).toMatch(/^https?:\/\/.+$/)
})

test('array', () => {
  const arr = [1, 2, 3, 4]
  expect(arr).toContain(3)
  expect(arr.length).toBe(4)
})

test('throw', () => {
  function toSyntaxError () {
    throw new SyntaxError('syntax')
  }

  expect(toSyntaxError).toThrow()
  expect(toSyntaxError).toThrow(SyntaxError)
  expect(toSyntaxError).toThrow('syntax')
  expect(toSyntaxError).toThrow(/syntax/)
})

test('callback', done => {
  function fetchData(callback) {
    setTimeout(() => {
      callback({ code: 1 })
    }, 200)
  }

  function callback(data) {
    expect(data.code).toBe(1)
    expect(data).toEqual({ code: 1 })
    done()
  }

  fetchData(callback)
})

test('promise', () => {
  function fetchData (status) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (status) {
          resolve({ data: { name: 'fetchData' } })
        } else {
          resolve(new Error('status Error'))
        }
      }, 100)
    })
  }

  fetchData(1).then((res) => {
    expect(res.data.name).toBe('fetchData')
  })

  fetchData().catch((err) => {
    expect(err).toThrow()
  })
})

test('async', async () => {
  async function fetchData() {
    return {
      data: {
        name: 'async'
      }
    }
  }

  const res = await fetchData()
  expect(res.data.name).toBe('async')
})