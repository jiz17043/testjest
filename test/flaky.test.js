const { sometimesFails } = require('../src/funct');

test('flaky test: sometimesFails returns true', () => {
  expect(sometimesFails()).toBe(true);
});
