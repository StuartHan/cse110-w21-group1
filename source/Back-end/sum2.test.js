const sum = require('./sum2');

test('adds 1 + 2 to equal 3', () => {
  expect(sum2(1, 2)).toBe(3);
});