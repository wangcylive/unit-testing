describe('a.js:', function () {
  it ('isDouble () should work fine.', function () {
    expect(isDouble(1)).toBe(true)
    expect(isDouble(10)).toBe(true)
    expect(isDouble('1')).toBe(false)
    expect(isDouble('11')).toBe(true)
    expect(isDouble(null)).toBe(false)
    expect(isDouble('10a')).toBe(false)
    expect(isDouble(true)).toBe(false)
    expect(isDouble({ valueOf: function () {return 9} })).toBe(true)
  })
})