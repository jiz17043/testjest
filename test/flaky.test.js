const { sometimesFails } = require('../src/func');

test('flaky test: sometimesFails returns true', () => {
  expect(sometimesFails()).toBe(true);
});
