import { part1, part2, processMul } from './day3';

describe('Day 3', () => {
  const exampleInputPart1 = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
  const exampleInputPart2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

  describe('processMul', () => {
    it('should multiply numbers within parentheses', () => {
      expect(processMul('mul(2,3)')).toBe(6);
      expect(processMul('mul(10,5)')).toBe(50);
    });

    it('should handle single digit numbers', () => {
      expect(processMul('mul(1,1)')).toBe(1);
      expect(processMul('mul(9,9)')).toBe(81);
    });

    it('should handle three digit numbers', () => {
      expect(processMul('mul(100,200)')).toBe(20000);
    });

    it('should return 0 for invalid input', () => {
      expect(processMul('invalid')).toBe(0);
      expect(processMul('')).toBe(0);
    });
  });

  test(' Day 3 part 1', () => {
    expect(part1(exampleInputPart1)).toBe(161);
  });

  test('Day 3 part 2', () => {
    expect(part2(exampleInputPart2)).toBe(48);
  });
});