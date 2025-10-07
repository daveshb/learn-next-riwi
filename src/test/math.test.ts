import {sum, isEven} from '../helpers/utils';

describe('utils/math', () => {

  test('sum adds numbers', () => {
    expect(sum(2, 3)).toBe(5)
  });
  test('sum adds numbers', () => {
    expect(sum(10, 20)).toBe(30)
  });

  test('isEven returns true for even numbers', () => {
    expect(isEven(4)).toBe(true);
    expect(isEven(5)).toBe(false);
  });

});