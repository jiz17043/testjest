const { sometimesFails } = require('../src/funct');

test('flaky test: sometimesFails returns true', () => {
  expect(sometimesFails()).toBe(true);
});

test('sometimesFails returns a boolean', () => {
  const result = sometimesFails();
  expect(typeof result).toBe('boolean');
});

test('sometimesFails does not throw', () => {
  expect(() => sometimesFails()).not.toThrow();
});
