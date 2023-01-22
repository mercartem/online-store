import modal from '../views/components/Modal/Modal';

test('maskCard', () => {
  expect(modal.maskCard('2222222222222222', 4, ' ')).toBe('2222 2222 2222 2222');
  expect(modal.maskCard('1234567890', 3, '-')).toBe('123-456-789-0');
  expect(modal.maskCard('1224', 2, '/')).toBe('12/24');
});
